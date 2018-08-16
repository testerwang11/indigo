import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'

import { DashboardRoutingModule } from './dashboard-routing.module'
import { GroupsComponent } from './groups/groups.component'

const COMPONENT = [
  GroupsComponent,
]

const COMPONENT_NOROUNT = []

@NgModule({
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
  providers: [],
  declarations: [...COMPONENT, ...COMPONENT_NOROUNT],
  entryComponents: COMPONENT_NOROUNT,
})
export class DashboardModule { }