import { PortfolioData, defaultPortfolioData } from "@/types/portfolio"

const STORAGE_KEY = "portfolio_data"
const STORAGE_VERSION = "1.0"

interface StorageData {
  version: string
  data: PortfolioData
  lastUpdated: string
}

export class PortfolioStorage {
  private static instance: PortfolioStorage
  private storageKey: string
  private isServer: boolean

  constructor() {
    this.storageKey = STORAGE_KEY
    this.isServer = typeof window === 'undefined'
  }

  static getInstance(): PortfolioStorage {
    if (!PortfolioStorage.instance) {
      PortfolioStorage.instance = new PortfolioStorage()
    }
    return PortfolioStorage.instance
  }

  // 保存数据到localStorage和服务器
  async save(data: PortfolioData): Promise<boolean> {
    try {
      const storageData: StorageData = {
        version: STORAGE_VERSION,
        data,
        lastUpdated: new Date().toISOString()
      }

      // 客户端保存到localStorage
      if (!this.isServer) {
        localStorage.setItem(this.storageKey, JSON.stringify(storageData))
      }

      // 同时保存到服务器
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        console.warn("服务器保存失败，但本地保存成功")
      }

      return true
    } catch (error) {
      console.error("保存数据失败:", error)
      return false
    }
  }

  // 从localStorage或服务器加载数据
  async load(): Promise<PortfolioData> {
    try {
      // 客户端优先从localStorage加载
      if (!this.isServer) {
        const stored = localStorage.getItem(this.storageKey)
        if (stored) {
          const storageData: StorageData = JSON.parse(stored)
          if (storageData.version === STORAGE_VERSION) {
            return storageData.data
          }
        }
      }

      // 从服务器加载数据
      const response = await fetch('/api/portfolio', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const serverData = await response.json()
        
        // 客户端同时保存到localStorage
        if (!this.isServer) {
          const storageData: StorageData = {
            version: STORAGE_VERSION,
            data: serverData,
            lastUpdated: new Date().toISOString()
          }
          localStorage.setItem(this.storageKey, JSON.stringify(storageData))
        }
        
        return serverData
      }

      return defaultPortfolioData
    } catch (error) {
      console.error("加载数据失败:", error)
      return defaultPortfolioData
    }
  }

  // 清除所有数据
  async clear(): Promise<boolean> {
    try {
      if (!this.isServer) {
        localStorage.removeItem(this.storageKey)
      }

      const response = await fetch('/api/portfolio', {
        method: 'DELETE',
      })

      return response.ok
    } catch (error) {
      console.error("清除数据失败:", error)
      return false
    }
  }

  // 检查是否有保存的数据
  async hasData(): Promise<boolean> {
    try {
      if (!this.isServer) {
        return localStorage.getItem(this.storageKey) !== null
      }

      const response = await fetch('/api/portfolio', {
        method: 'GET',
      })

      return response.ok
    } catch (error) {
      return false
    }
  }

  // 获取最后更新时间
  async getLastUpdated(): Promise<string | null> {
    try {
      if (!this.isServer) {
        const stored = localStorage.getItem(this.storageKey)
        if (!stored) return null

        const storageData: StorageData = JSON.parse(stored)
        return storageData.lastUpdated
      }

      const response = await fetch('/api/portfolio/last-updated', {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        return data.lastUpdated
      }

      return null
    } catch (error) {
      return null
    }
  }

  // 导出数据
  async export(): Promise<string> {
    try {
      const data = await this.load()
      return JSON.stringify(data, null, 2)
    } catch (error) {
      console.error("导出数据失败:", error)
      return ""
    }
  }

  // 导入数据
  async import(jsonData: string): Promise<boolean> {
    try {
      const data: PortfolioData = JSON.parse(jsonData)
      return await this.save(data)
    } catch (error) {
      console.error("导入数据失败:", error)
      return false
    }
  }

  // 备份数据
  async backup(): Promise<boolean> {
    try {
      const data = await this.load()
      if (!this.isServer) {
        const backupKey = `${this.storageKey}_backup_${Date.now()}`
        localStorage.setItem(backupKey, JSON.stringify(data))
      }
      return true
    } catch (error) {
      console.error("备份数据失败:", error)
      return false
    }
  }

  // 恢复备份
  async restore(backupKey: string): Promise<boolean> {
    try {
      if (!this.isServer) {
        const backupData = localStorage.getItem(backupKey)
        if (!backupData) return false

        const data: PortfolioData = JSON.parse(backupData)
        return await this.save(data)
      }
      return false
    } catch (error) {
      console.error("恢复备份失败:", error)
      return false
    }
  }
}

// 导出单例实例
export const portfolioStorage = PortfolioStorage.getInstance() 