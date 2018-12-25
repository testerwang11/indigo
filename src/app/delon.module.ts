import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core'
import { throwIfAlreadyLoaded } from '@core/module-import-guard'
import { PageHeaderConfig } from '@delon/abc'
import { DelonAuthConfig } from '@delon/auth'
import { DelonMockModule } from '@delon/mock'
import { AlainThemeModule } from '@delon/theme'
import { environment } from '@env/environment'
import { NgZorroAntdModule } from 'ng-zorro-antd'

import * as MOCKDATA from '../../_mock'

// mock
const MOCKMODULE = !environment.production ? [DelonMockModule.forRoot({ data: MOCKDATA })] : []

// region: global config functions

export function pageHeaderConfig(): PageHeaderConfig {
  return Object.assign(new PageHeaderConfig(), { home_i18n: 'home' })
}

export function delonAuthConfig(): DelonAuthConfig {
  return Object.assign(new DelonAuthConfig(), <DelonAuthConfig>{
    login_url: '/passport/login',
    ignores: [/api\/user\/login/, /assets\//]
  })
}

// endregion

@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    AlainThemeModule.forRoot(),
    // mock
    // ...MOCKMODULE,
  ],
})
export class DelonModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: DelonModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'DelonModule')
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DelonModule,
      providers: [
        // TIPS：@delon/abc 有大量的全局配置信息，例如设置所有 `simple-table` 的页码默认为 `20` 行
        // { provide: SimpleTableConfig, useFactory: simpleTableConfig }
        { provide: PageHeaderConfig, useFactory: pageHeaderConfig },
        { provide: DelonAuthConfig, useFactory: delonAuthConfig },
      ],
    }
  }
}
