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

  constructor() {
    this.storageKey = STORAGE_KEY
  }

  static getInstance(): PortfolioStorage {
    if (!PortfolioStorage.instance) {
      PortfolioStorage.instance = new PortfolioStorage()
    }
    return PortfolioStorage.instance
  }

  // 保存数据到localStorage
  save(data: PortfolioData): boolean {
    try {
      const storageData: StorageData = {
        version: STORAGE_VERSION,
        data,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem(this.storageKey, JSON.stringify(storageData))
      return true
    } catch (error) {
      console.error("保存数据失败:", error)
      return false
    }
  }

  // 从localStorage加载数据
  load(): PortfolioData {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (!stored) {
        return defaultPortfolioData
      }

      const storageData: StorageData = JSON.parse(stored)
      
      // 检查版本兼容性
      if (storageData.version !== STORAGE_VERSION) {
        console.warn("数据版本不匹配，使用默认数据")
        return defaultPortfolioData
      }

      return storageData.data
    } catch (error) {
      console.error("加载数据失败:", error)
      return defaultPortfolioData
    }
  }

  // 清除所有数据
  clear(): boolean {
    try {
      localStorage.removeItem(this.storageKey)
      return true
    } catch (error) {
      console.error("清除数据失败:", error)
      return false
    }
  }

  // 检查是否有保存的数据
  hasData(): boolean {
    try {
      return localStorage.getItem(this.storageKey) !== null
    } catch (error) {
      return false
    }
  }

  // 获取最后更新时间
  getLastUpdated(): string | null {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (!stored) return null

      const storageData: StorageData = JSON.parse(stored)
      return storageData.lastUpdated
    } catch (error) {
      return null
    }
  }

  // 导出数据
  export(): string {
    try {
      const data = this.load()
      return JSON.stringify(data, null, 2)
    } catch (error) {
      console.error("导出数据失败:", error)
      return ""
    }
  }

  // 导入数据
  import(jsonData: string): boolean {
    try {
      const data: PortfolioData = JSON.parse(jsonData)
      return this.save(data)
    } catch (error) {
      console.error("导入数据失败:", error)
      return false
    }
  }

  // 备份数据
  backup(): boolean {
    try {
      const data = this.load()
      const backupKey = `${this.storageKey}_backup_${Date.now()}`
      localStorage.setItem(backupKey, JSON.stringify(data))
      return true
    } catch (error) {
      console.error("备份数据失败:", error)
      return false
    }
  }

  // 恢复备份
  restore(backupKey: string): boolean {
    try {
      const backupData = localStorage.getItem(backupKey)
      if (!backupData) return false

      const data: PortfolioData = JSON.parse(backupData)
      return this.save(data)
    } catch (error) {
      console.error("恢复备份失败:", error)
      return false
    }
  }
}

// 导出单例实例
export const portfolioStorage = PortfolioStorage.getInstance() 