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

  // 从服务器加载数据，localStorage仅作为备份
  async load(): Promise<PortfolioData> {
    try {
      // 优先从服务器加载数据
      const response = await fetch('/api/portfolio', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache' // 禁用缓存，确保获取最新数据
      })

      if (response.ok) {
        const serverData = await response.json()
        
        // 客户端同时保存到localStorage作为备份
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

      // 如果服务器加载失败，尝试从localStorage加载（仅客户端）
      if (!this.isServer) {
        const stored = localStorage.getItem(this.storageKey)
        if (stored) {
          const storageData: StorageData = JSON.parse(stored)
          if (storageData.version === STORAGE_VERSION) {
            console.warn("服务器数据加载失败，使用本地备份数据")
            return storageData.data
          }
        }
      }

      return defaultPortfolioData
    } catch (error) {
      console.error("加载数据失败:", error)
      
      // 如果服务器请求失败，尝试从localStorage加载（仅客户端）
      if (!this.isServer) {
        try {
          const stored = localStorage.getItem(this.storageKey)
          if (stored) {
            const storageData: StorageData = JSON.parse(stored)
            if (storageData.version === STORAGE_VERSION) {
              console.warn("服务器数据加载失败，使用本地备份数据")
              return storageData.data
            }
          }
        } catch (localError) {
          console.error("本地数据加载也失败:", localError)
        }
      }
      
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
      const response = await fetch('/api/portfolio', {
        method: 'GET',
        cache: 'no-cache'
      })

      return response.ok
    } catch (error) {
      return false
    }
  }

  // 获取最后更新时间
  async getLastUpdated(): Promise<string | null> {
    try {
      const response = await fetch('/api/portfolio/last-updated', {
        method: 'GET',
        cache: 'no-cache'
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