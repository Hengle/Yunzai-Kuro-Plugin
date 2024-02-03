import path from 'path'
import fs from 'fs'
import {
  pluginName,
  pluginNameReadable,
  pluginAuthor,
  pluginRepo,
  pluginDesc,
  pluginThemeColor,
  _ResPath,
  _CfgPath,
  _DataPath,
} from './data/system/pluginConstants.js'
import kuroLogger from './components/logger.js'
import { sendMsgFriend } from './model/utils.js'
import cfg from '../../lib/config/config.js'

// 支持锅巴
export function supportGuoba() {
  const configPath = path.join(_CfgPath, 'config.json')
  const defaultConfigPath = path.join(_DataPath, 'system/default_config.json')

  let configJson
  getConfigFromFile()
  return {
    // 插件信息，将会显示在前端页面
    // 如果你的插件没有在插件库里，那么需要填上补充信息
    // 如果存在的话，那么填不填就无所谓了，填了就以你的信息为准
    pluginInfo: {
      name: pluginName,
      title: pluginNameReadable,
      author: pluginAuthor,
      authorLink: pluginRepo,
      link: pluginRepo,
      isV3: true,
      isV2: false,
      description: pluginDesc,
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      icon: 'arcticons:kuro-reader',
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
      iconColor: pluginThemeColor,
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
      iconPath: _ResPath + '/img/common/icon/pns.png',
    },
    // 配置项信息
    configInfo: {
      // 配置项 schemas
      schemas: [
        {
          field: 'logger.logLevel',
          label: '日志等级',
          helpMessage: '库洛插件的日志等级, 与 Yunzai 的独立',
          bottomHelpMessage: '请选择日志等级, 通常应选择 info',
          component: 'Select',
          componentProps: {
            options: [
              { label: 'debug', value: 'debug' },
              { label: 'info', value: 'info' },
              { label: 'warn', value: 'warn' },
              { label: 'error', value: 'error' },
            ],
            placeholder: '读取失败',
          },
        },
        {
          field: 'logger.saveToFile',
          label: '保存日志',
          bottomHelpMessage: '将日志保存到文件',
          component: 'Switch'
        },
      ],
      // 获取配置数据方法（用于前端填充显示数据）
      getConfigData() {
        return configJson
      },
      // 设置配置的方法（前端点确定后调用的方法）
      setConfigData(data, { Result }) {
        configJson = flattenObject(data)
        kuroLogger.debug('欲保存的新配置数据:', JSON.stringify(configJson))
        let saveRst = updateConfigFile()
        if (saveRst) return Result.error(saveRst)
        else return Result.ok({}, '保存成功辣ε(*´･ω･)з')
      },
    },
  }

  function getConfigFromFile() {
    try {
      // 尝试读取config.json
      const rawData = fs.readFileSync(configPath)
      configJson = JSON.parse(rawData)

      // 读取 default_config.json
      const defaultRawData = fs.readFileSync(defaultConfigPath)
      const defaultConfigJson = JSON.parse(defaultRawData)

      // 比较配置文件更新
      let testConfigJson = mergeObjects(defaultConfigJson, configJson)
      if (JSON.stringify(testConfigJson) !== JSON.stringify(configJson)) {
        kuroLogger.warn('配置文件有更新, 建议检查是否有新的项目需要配置!')
        kuroLogger.debug('testConfigJson:', JSON.stringify(testConfigJson))
        kuroLogger.debug('configJson:', JSON.stringify(configJson))
        configJson = testConfigJson
        updateConfigFile()
        sendMsgFriend(
          cfg.masterQQ[0],
          `[库洛插件] 配置文件有更新, 建议检查是否有新的项目需要配置!`
        )
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        // 如果config.json不存在，则从default_config.json复制一份
        kuroLogger.warn('config.json 不存在, 生成默认配置...')
        const defaultRawData = fs.readFileSync(defaultConfigPath)
        fs.writeFileSync(configPath, defaultRawData)
        configJson = JSON.parse(defaultRawData)
      } else {
        // 处理其他可能的读取错误
        kuroLogger.error('读取 config.json 出错:', error.message)
      }
    }
  }

  /**
   * 更新配置文件
   * @returns {string | null} 返回错误信息，如果成功则返回null
   */
  function updateConfigFile() {
    try {
      fs.writeFileSync(configPath, JSON.stringify(configJson, null, 2))
      kuroLogger.info('更新配置文件成功')
      return null
    } catch (error) {
      let errMsg = '更新配置文件失败: ' + error.message
      kuroLogger.error('更新配置文件失败:', errMsg)
      return errMsg
    }
  }

  /**
   * 展开 json
   * @param {Object} inputJson 输入的 json
   * @returns {Object} 展开后的 json
   */
  function flattenObject(inputJson) {
    const outputJson = {}

    for (const key in inputJson) {
      const keys = key.split('.')
      let currentObject = outputJson

      for (let i = 0; i < keys.length; i++) {
        const currentKey = keys[i]
        if (!currentObject[currentKey]) {
          currentObject[currentKey] = {}
        }

        if (i === keys.length - 1) {
          // 最后一个键，赋予值
          currentObject[currentKey] = inputJson[key]
        } else {
          // 还不是最后一个键，继续进入下一层对象
          currentObject = currentObject[currentKey]
        }
      }
    }

    return outputJson
  }

  /**
   * 使用 newObj 补充 oldObj 缺失的字段
   * @param {Object} newObj 新对象
   * @param {Object} oldObj 旧对象
   * @returns {Object} 合并后的对象
   */
  function mergeObjects(newObj, oldObj) {
    let mergedObj = { ...oldObj }
    for (const key in newObj) {
      if (typeof newObj[key] === 'object') {
        if (!(key in mergedObj)) {
          mergedObj[key] = {}
        }
        mergedObj[key] = mergeObjects(newObj[key], mergedObj[key])
      } else if (!(key in mergedObj)) {
        mergedObj[key] = newObj[key]
      }
    }
    return mergedObj
  }
}
