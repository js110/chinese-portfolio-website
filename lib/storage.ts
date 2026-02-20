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
    this.isServer = typeof window === "undefined"
  }

  static getInstance(): PortfolioStorage {
    if (!PortfolioStorage.instance) {
      PortfolioStorage.instance = new PortfolioStorage()
    }
    return PortfolioStorage.instance
  }

  async save(data: PortfolioData): Promise<boolean> {
    try {
      const storageData: StorageData = {
        version: STORAGE_VERSION,
        data,
        lastUpdated: new Date().toISOString(),
      }

      if (!this.isServer) {
        localStorage.setItem(this.storageKey, JSON.stringify(storageData))
      }

      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        console.warn('服务端保存失败')
        return false
      }

      return true
    } catch (error) {
      console.error('保存数据失败:', error)
      return false
    }
  }

  async load(): Promise<PortfolioData> {
    try {
      const response = await fetch('/api/portfolio', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      })

      if (response.ok) {
        const serverData = await response.json()

        if (!this.isServer) {
          const storageData: StorageData = {
            version: STORAGE_VERSION,
            data: serverData,
            lastUpdated: new Date().toISOString(),
          }
          localStorage.setItem(this.storageKey, JSON.stringify(storageData))
        }

        return serverData
      }

      if (!this.isServer) {
        const stored = localStorage.getItem(this.storageKey)
        if (stored) {
          const storageData: StorageData = JSON.parse(stored)
          if (storageData.version === STORAGE_VERSION) {
            console.warn('服务端加载失败，使用本地备份数据')
            return storageData.data
          }
        }
      }

      return defaultPortfolioData
    } catch (error) {
      console.error('加载数据失败:', error)

      if (!this.isServer) {
        try {
          const stored = localStorage.getItem(this.storageKey)
          if (stored) {
            const storageData: StorageData = JSON.parse(stored)
            if (storageData.version === STORAGE_VERSION) {
              console.warn('服务端加载失败，使用本地备份数据')
              return storageData.data
            }
          }
        } catch (localError) {
          console.error('本地数据加载也失败:', localError)
        }
      }

      return defaultPortfolioData
    }
  }

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
      console.error('清除数据失败:', error)
      return false
    }
  }

  async hasData(): Promise<boolean> {
    try {
      const response = await fetch('/api/portfolio', {
        method: 'GET',
        cache: 'no-cache',
      })

      return response.ok
    } catch {
      return false
    }
  }

  async getLastUpdated(): Promise<string | null> {
    try {
      const response = await fetch('/api/portfolio/last-updated', {
        method: 'GET',
        cache: 'no-cache',
      })

      if (response.ok) {
        const data = await response.json()
        return data.lastUpdated
      }

      return null
    } catch {
      return null
    }
  }

  async export(): Promise<string> {
    try {
      const data = await this.load()
      return JSON.stringify(data, null, 2)
    } catch (error) {
      console.error('导出数据失败:', error)
      return ''
    }
  }

  async import(jsonData: string): Promise<boolean> {
    try {
      const data: PortfolioData = JSON.parse(jsonData)
      return await this.save(data)
    } catch (error) {
      console.error('导入数据失败:', error)
      return false
    }
  }

  async backup(): Promise<boolean> {
    try {
      const data = await this.load()
      if (!this.isServer) {
        const backupKey = `${this.storageKey}_backup_${Date.now()}`
        localStorage.setItem(backupKey, JSON.stringify(data))
      }
      return true
    } catch (error) {
      console.error('备份数据失败:', error)
      return false
    }
  }

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
      console.error('恢复备份失败:', error)
      return false
    }
  }
}

export const portfolioStorage = PortfolioStorage.getInstance()

