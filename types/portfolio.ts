export interface PersonalInfo {
  name: string
  title: string
  description: string
  avatar: string
  skills: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  role: string
  gradient: string
  image?: string
  link?: string
  technologies?: string[]
  startDate?: string
  endDate?: string
  coverImage?: string // 新增：项目封面图
  featured: boolean
  createdAt: string
  updatedAt: string
  highlights?: string[]; // 项目亮点
  team?: { name: string; role: string; avatar?: string }[]; // 团队成员
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  description: string
  startDate: string
  endDate: string
  current: boolean
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
}

export interface Resume {
  overview: string
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  projects: Project[]
  resume: Resume
}

// 默认数据
export const defaultPersonalInfo: PersonalInfo = {
  name: "陈明",
  title: "软件工程师 | 全栈开发者",
  description: "经验丰富的软件工程师，专注于全栈开发，热衷于创造创新和高效的解决方案。在按时和预算内交付高质量项目方面拥有良好的记录。",
  avatar: "",
  skills: ["JavaScript", "React", "Node.js", "Python", "Django", "SQL", "AWS", "Docker", "Git", "HTML", "CSS", "UI/UX 设计"]
}

export const defaultProjects: Project[] = [
  {
    id: "1",
    title: "电子商务平台",
    description: "一个全面的电子商务平台，具有用户认证、产品管理和支付集成功能。",
    role: "全栈开发者",
    gradient: "from-blue-100 to-blue-200",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
    startDate: "2023-01",
    endDate: "2023-06",
    link: "https://example.com/ecommerce",
    coverImage: "https://example.com/ecommerce-cover.jpg",
    featured: true,
    createdAt: "2023-01-15T00:00:00.000Z",
    updatedAt: "2023-06-30T00:00:00.000Z",
    highlights: ["用户认证功能", "产品管理功能", "支付集成功能"],
    team: [
      { name: "张三", role: "全栈开发者", avatar: "" },
      { name: "李四", role: "前端开发者", avatar: "" },
      { name: "王五", role: "后端开发者", avatar: "" }
    ]
  },
  {
    id: "2",
    title: "移动健身应用",
    description: "一款旨在跟踪健身活动、设定目标并提供个性化锻炼计划的移动应用程序。",
    role: "前端开发者",
    gradient: "from-green-100 to-green-200",
    technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
    startDate: "2023-03",
    endDate: "2023-08",
    link: "https://example.com/fitness-app",
    coverImage: "https://example.com/fitness-app-cover.jpg",
    featured: true,
    createdAt: "2023-03-01T00:00:00.000Z",
    updatedAt: "2023-08-15T00:00:00.000Z",
    highlights: ["个性化锻炼计划", "健身活动跟踪", "目标设定功能"],
    team: [
      { name: "赵六", role: "前端开发者", avatar: "" },
      { name: "孙七", role: "后端开发者", avatar: "" }
    ]
  },
  {
    id: "3",
    title: "数据分析仪表板",
    description: "一个用于可视化复杂数据集并生成富有洞察力报告的交互式仪表板。",
    role: "数据工程师",
    gradient: "from-purple-100 to-purple-200",
    technologies: ["Python", "Django", "D3.js", "PostgreSQL", "Docker"],
    startDate: "2023-05",
    endDate: "2023-10",
    link: "https://example.com/dashboard",
    coverImage: "https://example.com/dashboard-cover.jpg",
    featured: false,
    createdAt: "2023-05-10T00:00:00.000Z",
    updatedAt: "2023-10-20T00:00:00.000Z",
    highlights: ["数据可视化", "富有洞察力报告", "交互式仪表板"],
    team: [
      { name: "周八", role: "数据工程师", avatar: "" }
    ]
  }
]

export const defaultWorkExperience: WorkExperience[] = [
  {
    id: "1",
    company: "科技解决方案公司",
    position: "高级软件工程师",
    description: "领导一个由10名开发人员组成的团队，负责网络和移动应用的设计、开发和部署。管理项目时间表、预算和资源，以确保项目的成功完成。",
    startDate: "2018",
    endDate: "至今",
    current: true
  },
  {
    id: "2",
    company: "创新系统公司",
    position: "软件工程师",
    description: "使用Java、Spring和React开发和维护网络应用。与跨职能团队协作，以收集需求并实现解决方案。",
    startDate: "2016",
    endDate: "2018",
    current: false
  },
  {
    id: "3",
    company: "创业公司X",
    position: "初级开发人员",
    description: "参与多个Web应用项目的开发，学习现代开发技术和最佳实践。",
    startDate: "2014",
    endDate: "2016",
    current: false
  }
]

export const defaultEducation: Education[] = [
  {
    id: "1",
    institution: "科技大学",
    degree: "硕士",
    field: "计算机科学",
    startDate: "2012",
    endDate: "2014"
  },
  {
    id: "2",
    institution: "州立大学",
    degree: "学士",
    field: "计算机科学",
    startDate: "2008",
    endDate: "2012"
  }
]

export const defaultResume: Resume = {
  overview: "一位充满动力并以结果为导向的专业人士，拥有超过8年的软件开发经验。在领导团队、管理项目以及提供满足并超过客户期望的高质量解决方案方面表现出色。",
  workExperience: defaultWorkExperience,
  education: defaultEducation,
  skills: ["Java", "Spring", "React", "JavaScript", "HTML", "CSS", "SQL", "敏捷开发方法"]
}

export const defaultPortfolioData: PortfolioData = {
  personalInfo: defaultPersonalInfo,
  projects: defaultProjects,
  resume: defaultResume
} 