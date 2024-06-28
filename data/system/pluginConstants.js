import fs from 'fs'
import chalk from 'chalk'

// 插件目录
export const pluginPath = './plugins/Yunzai-Kuro-Plugin'

// 读取package.json文件
const rawData = fs.readFileSync(pluginPath + '/package.json')
const packageJson = JSON.parse(rawData)

// 插件包信息
export const pluginAuthor = packageJson.author || '获取失败'
export const pluginName = packageJson.name || '获取失败'
export const pluginNameReadable = '库洛插件'
export const pluginVer = packageJson.version || 'unkVer'
export const pluginDesc = packageJson.description || '获取失败'
export const pluginRepo = packageJson.repository.url || 'Unknown'

// 插件数据目录
export const appsPath = pluginPath + '/apps'
export const dataPath = pluginPath + '/data'
export const _DataPath = `${process // 绝对目录
  .cwd()
  .replace(/\\/g, '/')}/plugins/${pluginName}/data`
export const resPath = pluginPath + '/resources'
export const _ResPath = `${process // 绝对目录
  .cwd()
  .replace(/\\/g, '/')}/plugins/${pluginName}/resources`
export const cfgPath = pluginPath + '/config'
export const _CfgPath = `${process // 绝对目录
  .cwd()
  .replace(/\\/g, '/')}/plugins/${pluginName}/config`
export const mcGachaDataPath = dataPath + '/gachaData/mc'
export const _McGachaDataPath = `${process // 绝对目录
  .cwd()
  .replace(/\\/g, '/')}/plugins/${pluginName}/data/gachaData/mc`

// 其它信息
export const pluginThemeColor = chalk.rgb(57, 197, 187)

// 鸣潮卡池类型 id 和对应名称
export const mcGachaType = [
  '未知',
  '角色活动唤取',
  '武器活动唤取',
  '角色常驻唤取',
  '武器常驻唤取',
  '新手唤取',
  '新手自选唤取',
  '新手自选唤取（感恩定向唤取）',
]

// 鸣潮历史 up 池时间和物品 id
export const mcGachaUpPools = [
  {
    // 1.0 上半, 提前开服故时间提前
    startTime: '1716393600', // 2024.05.23 00:00
    endTime: '1718243940', // 2024.06.13 09:59
    itemId: '1404',
    itemName: '忌炎',
    itemType: 1, // 1 为角色, 2 为武器
    cardPoolName: '夜将寒色去',
  },
  {
    // 1.0 上半, 提前开服故时间提前
    startTime: '1716393600', // 2024.05.23 00:00
    endTime: '1718243940', // 2024.06.13 09:59
    itemId: '21010016',
    itemName: '苍鳞千嶂',
    itemType: 2,
    cardPoolName: '浮声沉兵',
  },
  {
    // 1.0 下半, 卡池提前
    startTime: '1717639200', // 2024.06.06 10:00
    endTime: '1719374340', // 2024.06.26 11:59
    itemId: '1302',
    itemName: '吟霖',
    itemType: 1,
    cardPoolName: '惊霆雨时节',
  },
  {
    // 1.0 下半, 卡池提前
    startTime: '1717639200', // 2024.06.06 10:00
    endTime: '1719374340', // 2024.06.26 11:59
    itemId: '21050016',
    itemName: '掣傀之手',
    itemType: 2,
    cardPoolName: '浮声沉兵',
  },
  {
    // 1.1 上半
    startTime: '1719540000', // 2024.06.28 10:00
    endTime: '1721613540', // 2024.07.22 09:59
    itemId: '1607',
    itemName: '今汐',
    itemType: '1',
    cardPoolName: '寒尽觉春生',
  },
  {
    // 1.1 上半
    startTime: '1719540000', // 2024.06.28 10:00
    endTime: '1721613540', // 2024.07.22 09:59
    itemId: '21050016',
    itemName: '时和岁稔',
    itemType: 2,
    cardPoolName: '浮声沉兵',
  },
  {
    // 1.1 下半
    startTime: '1721613600', // 2024.07.22 10:00
    endTime: '1723687140', // 2024.08.15 09:59
    itemId: '1608',
    itemName: '长离',
    itemType: '1',
    cardPoolName: '炽羽策阵星',
  },
  {
    // 1.1 下半
    startTime: '1721613600', // 2024.07.22 10:00
    endTime: '1723687140', // 2024.08.15 09:59
    itemId: '21020016',
    itemName: '赫奕流明',
    itemType: 2,
    cardPoolName: '浮声沉兵',
  },
]
