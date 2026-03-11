

## [1.16.3](https://github.com/pysunday/rs-reverse/compare/1.16.1...1.16.3) (2026-02-17)


### Bug Fixes

* 代理外置，通过环境变量proxy设置 ([907dbcf](https://github.com/pysunday/rs-reverse/commit/907dbcfe1f73c2cd3c59c9a459a06102928013a9))
* 如网站使用额外debugger版本，但是实际未使用，rs-reverse无法自动判断，因此增加--has-debug=false参数关闭功能，close [#24](https://github.com/pysunday/rs-reverse/issues/24) ([f2e71b8](https://github.com/pysunday/rs-reverse/commit/f2e71b8a0f104240b2b3bde10bbcc7b5fda9cf4c))

## [1.16.1](https://github.com/pysunday/rs-reverse/compare/1.16.0...1.16.1) (2025-12-16)


### Bug Fixes

* hasDebug优先级调整，-f命令优先级大于basearr优先级 ([d66a301](https://github.com/pysunday/rs-reverse/commit/d66a301984444a20d771f3d1f6d4eef34b980ad5))

## [1.16.0](https://github.com/pysunday/rs-reverse/compare/1.15.1...1.16.0) (2025-12-16)


### Features

* 额外debugger版本适配，url形式会自动判断，本地形式通过-f文件内配置，与basearr配置项hasDebug同效 ([ae983c6](https://github.com/pysunday/rs-reverse/commit/ae983c68a3519bc3eae7671584cca330c072679c))

## [1.15.1](https://github.com/pysunday/rs-reverse/compare/1.15.0...1.15.1) (2025-10-29)


### Bug Fixes

* 1. 定位任务报错问题修复;2. basearr命令优化 ([bde7b82](https://github.com/pysunday/rs-reverse/commit/bde7b829fd17176169e9209d57b992a2fddebe0b))

## [1.15.0](https://github.com/pysunday/rs-reverse/compare/1.14.0...1.15.0) (2025-10-22)


### Features

* 适配V1RJWBdeVk8XWlc=和S1BPXEtKXFpMS1BNQBdaVlQ= ([17318cd](https://github.com/pysunday/rs-reverse/commit/17318cd9aa1ad7f717f59ca757a31a74ffc98ddc))

## [1.14.0](https://github.com/pysunday/rs-reverse/compare/1.13.0...1.14.0) (2025-10-22)


### Features

* 适配WkxKTVZUShdeVk8XWlc=和X1hXXl1QF1pWVBdaVw== ([de67172](https://github.com/pysunday/rs-reverse/commit/de671722f11c5834f232f6bcec025a019e26a3b5))

## [1.13.0](https://github.com/pysunday/rs-reverse/compare/1.12.0...1.13.0) (2025-10-21)


### Features

* 新增适配U18XWlpbF1pWVA== ([428d9b1](https://github.com/pysunday/rs-reverse/commit/428d9b1472e7409c5d3db93724e95a060b27efd1))

## [1.12.0](https://github.com/pysunday/rs-reverse/compare/1.11.0...1.12.0) (2025-10-21)


### Features

* 新增适配XFRKF1pWVBdaVw== ([ddf1ea8](https://github.com/pysunday/rs-reverse/commit/ddf1ea8f6be455e95eb832eadcee9bc45676ed0d))

## [1.11.0](https://github.com/pysunday/rs-reverse/compare/1.10.1...1.11.0) (2025-10-21)


### Features

* 新增适配V1NXTBdcXUwXWlc= ([74d427b](https://github.com/pysunday/rs-reverse/commit/74d427bfc68fe88e27612cced8f238f81241431f))

## [1.10.1](https://github.com/pysunday/rs-reverse/compare/1.10.0...1.10.1) (2025-10-18)

## [1.10.0](https://github.com/pysunday/rs-reverse/compare/1.8.1...1.10.0) (2025-10-16)


### Features

* keynameNum和functionSortStart两个可变参数动态获取 ([40347c0](https://github.com/pysunday/rs-reverse/commit/40347c04c13bb2b7295431d143ecb3ebb3145fb7))
* makecode命令修复，增加网站适配：epub.cnipa.gov.cn ([935966a](https://github.com/pysunday/rs-reverse/commit/935966ad134715fc15dee39d6b899484357fc487))
* makecookie生成方法分类 ([0fed723](https://github.com/pysunday/rs-reverse/commit/0fed723e297497e39a46d4a75eb5d8fdb49603dd))
* 适配makecookie、makecode-high ([babcf42](https://github.com/pysunday/rs-reverse/commit/babcf4230a8afaba25df41e80aa44465ed2c94ec))
* 适配makecookie初版 ([cc4eda3](https://github.com/pysunday/rs-reverse/commit/cc4eda3da1e91bbad4da812cd203fbff82aee99f))
* 适配网站zhaopin.sgcc.com.cn ([4ee180f](https://github.com/pysunday/rs-reverse/commit/4ee180f530c0e882d3728fcf5f60345c14a6fe07))


### Bug Fixes

* -j命令支持本地文件 ([c010117](https://github.com/pysunday/rs-reverse/commit/c010117993bfcd7340482dd277c99a50e99ea60e))
* 修改日志打印和默认等级 ([f343cde](https://github.com/pysunday/rs-reverse/commit/f343cdedb14c6964717c6e7fce398633fefb6c20))

## [1.8.1](https://github.com/pysunday/rs-reverse/compare/1.8.0...1.8.1) (2025-09-09)


### Bug Fixes

* 打开上传npm开关 ([bff8981](https://github.com/pysunday/rs-reverse/commit/bff898150bf97b9b81fef6cbd8cfecf7eb162acb))

## [1.8.0](https://github.com/pysunday/rs-reverse/compare/1.7.0...1.8.0) (2025-09-09)


### Features

* 1. makecode子命令增加-j入参，用于还原$_ts.l__处理的js代码 2.生成目标文件调整 3. readme更新 ([5149726](https://github.com/pysunday/rs-reverse/commit/51497269488a32aad65b92c6b17b0a9cb9934d61))
* 增加-o命令 ([fc1e32f](https://github.com/pysunday/rs-reverse/commit/fc1e32fd0bc8b5a4e35c5d5136f9119bf546e155))


### Bug Fixes

* 下标未传入问题修复 ([15e055a](https://github.com/pysunday/rs-reverse/commit/15e055a041a5967252dda2a5257631b2f7aa0925))
* 拷贝目录报错修复 ([b8702c0](https://github.com/pysunday/rs-reverse/commit/b8702c0eeee0a32c11775af523c5e0ecb42fc5bc))

## [1.7.1](https://github.com/pysunday/rs-reverse/compare/1.7.0...1.7.1) (2024-04-10)


### Bug Fixes

* 拷贝目录报错修复 ([b8702c0](https://github.com/pysunday/rs-reverse/commit/b8702c0eeee0a32c11775af523c5e0ecb42fc5bc))

## [1.7.0](https://github.com/pysunday/rs-reverse/compare/1.6.0...1.7.0) (2024-04-10)


### Features

* 1. 增加makecode-high子命令 2. 增加basearr子命令 ([7757ad5](https://github.com/pysunday/rs-reverse/commit/7757ad59341e1278f1f3ea37f2c09fe6374c9193))


### Bug Fixes

* 1. exec命令适配版本；2. 新版cookie位数逻辑更新（无法过检测） ([ae822c7](https://github.com/pysunday/rs-reverse/commit/ae822c7a4dc908fe483d622ff4b391719b447703))
* 文档更新、代码优化 ([36848f8](https://github.com/pysunday/rs-reverse/commit/36848f8527ab954723dccb886b2931047c3c35a6))
* 更新readme ([4caaf73](https://github.com/pysunday/rs-reverse/commit/4caaf73979105168ecfedcf0279fde2d279290cf))

## [1.6.0](https://github.com/pysunday/rs-reverse/compare/1.5.1...1.6.0) (2024-03-28)


### Features

* 增加多版本控制、增加其它瑞数网站适配、动态执行逻辑重构 ([8771a69](https://github.com/pysunday/rs-reverse/commit/8771a698361c80ab94af0057e743d4312b3a5be4))


### Bug Fixes

* 适配更新 ([d048898](https://github.com/pysunday/rs-reverse/commit/d0488986a1c952c2f0f47d1afbc2089386ba31a0))

## [1.5.1](https://github.com/pysunday/rs-reverse/compare/1.5.0...1.5.1) (2024-03-08)


### Bug Fixes

* 生成html与js代码文件去除stringify ([f4ea982](https://github.com/pysunday/rs-reverse/commit/f4ea982fb270fd62f59e96af7698675eb48142a8))

## [1.5.0](https://github.com/pysunday/rs-reverse/compare/1.4.0...1.5.0) (2024-03-08)


### Features

* 增加html文件与javascript代码文件的保存 ([59b86f0](https://github.com/pysunday/rs-reverse/commit/59b86f0ab99b458638802108b223060135d41140))

## [1.4.0](https://github.com/pysunday/rs-reverse/compare/1.3.0...1.4.0) (2024-01-20)


### Features

* 1. 增加电量信息与网络连接信息的处理；2. 增加meta标签的content值的解析与打印；3. uua值从npm包工具随机取 ([69c8db6](https://github.com/pysunday/rs-reverse/commit/69c8db619dd34914c256828585bf326f1c06f523))

## 1.3.0 (2024-01-06)


### Features

* add blog article ([10af3e7](https://github.com/pysunday/rs-reverse/commit/10af3e7a66fb5250f8c6d5f8b55360e8d8d51015))
* add encrypt function ([5abb5e4](https://github.com/pysunday/rs-reverse/commit/5abb5e456a4f5690cd8922b2a722daa650f04d9a))
* add loopcode/makecookie and Cookie global varible ([6973aa6](https://github.com/pysunday/rs-reverse/commit/6973aa68508b06c758d5777118f8fb7f89c8e6ba))
* add makecookie must handler functions ([cc89969](https://github.com/pysunday/rs-reverse/commit/cc899698f87067d0ffa03437a5d42260ca57a514))
* add uuid、numToNumber4 function, add bignum list ([852a647](https://github.com/pysunday/rs-reverse/commit/852a6478b5660d239856939ab47827fe0dc64594))
* algorithm for generating cookies has been fully restored ([5570c75](https://github.com/pysunday/rs-reverse/commit/5570c75cd1c9c834d4cff8dc9b2f8099c4975e75))
* immutext automatic extraction ([96068dd](https://github.com/pysunday/rs-reverse/commit/96068ddc285e9d09b1fd2966664586a2b83c4cf4))
* key component function extraction ([0b38130](https://github.com/pysunday/rs-reverse/commit/0b38130533794d8665a7fc67a557572d3defcaf0))
* key iv value logic optimization, addition of dynamic code execution mechanism ([fe2577e](https://github.com/pysunday/rs-reverse/commit/fe2577e51f8e057945c4440107932b5db89f4df7))
* makecookie command support remote url gerente cookie ([76e2d20](https://github.com/pysunday/rs-reverse/commit/76e2d20d9644f4cbc64a66ec7dd543dd1a8b401b))
* mock document.all and test ([eb834cc](https://github.com/pysunday/rs-reverse/commit/eb834cc4a90a812ffc5e6f0f5e008488127a39ec))


### Bug Fixes

* code logging optimization，upload to npm ([45588d1](https://github.com/pysunday/rs-reverse/commit/45588d148f8a81421e1e8838ba42b07c52a1caf6))
* code optimization for the makecookie command ([fda003f](https://github.com/pysunday/rs-reverse/commit/fda003f6b199c2a5f78f9ec4a83eeae450f2fc6a))
* README add blog link ([c3204f6](https://github.com/pysunday/rs-reverse/commit/c3204f65092c8f4fb1784dbb0c66aaa2b5236827))
* readme and console ([cb08efe](https://github.com/pysunday/rs-reverse/commit/cb08efe0f1dc568ebe27e0665e87b461ed212404))
* readme update ([8186ef7](https://github.com/pysunday/rs-reverse/commit/8186ef7915a298b195b32087282043fa8e1dce15))
* update README ([bfbc06b](https://github.com/pysunday/rs-reverse/commit/bfbc06bc8f0337b7d586407e4ed0b05e183142da))
* url/readme ([9351bc7](https://github.com/pysunday/rs-reverse/commit/9351bc7e17cf67b3f4fa997939bd297367b811e6))
* use path.sep ([ccbcbcc](https://github.com/pysunday/rs-reverse/commit/ccbcbcc3fa368e79b1a18add4e239b5a0dcd071b))
