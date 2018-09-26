import { JobData } from './job.model'

interface BaseDoc {
  _id?: string
  summary?: string
  description?: string
  creator?: string
  createdAt?: string
}

export interface LabelRef {
  name?: string
}

export interface Label extends LabelRef {
  owner?: string
  name?: string
  description?: string
  value?: string
  type?: string
}

export interface Group extends BaseDoc {
  id?: string
  avatar?: string
}

export interface Project extends BaseDoc {
  id?: string
  group?: string
  avatar?: string
  openapi?: string
}

export interface Api extends BaseDoc {
  type?: string
  path?: string
  method?: string
  deprecated?: boolean
  service?: string
  version?: string
  labels?: LabelRef[]
  schema?: Object & string
  project?: string
  group?: string
}

export interface Case extends BaseDoc {
  project?: string
  group?: string
  request?: CaseRequest
  /** 后端为Map类型, 前端组件内为 string */
  assert?: any
  env?: string
  labels?: LabelRef[]
}

export interface ScenarioStep {
  id?: string
  type?: string
  data?: any
}

export interface Scenario extends BaseDoc {
  group?: string
  project?: string
  steps?: ScenarioStep[]
  labels?: LabelRef[]
}

export interface KeyValueObject {
  key?: string
  value?: string
  enabled?: boolean
}

export interface MediaObject {
  contentType?: string
  data?: any
}

export interface CaseRequest {
  protocol?: string
  host?: string
  rawUrl?: string
  urlPath?: string
  port?: number
  auth?: Authorization
  method?: string
  path?: KeyValueObject[]
  query?: KeyValueObject[]
  header?: KeyValueObject[]
  cookie?: KeyValueObject[]
  contentType?: string
  body?: MediaObject[]
}

export interface CaseStatis {
  failed?: number
  passed?: number
  isSuccessful?: boolean
}

export interface CaseResultRequest {
  method?: string
  url?: string
  headers?: Object
  body?: string
}

export interface CaseResultResponse {
  statusCode?: number
  statusMsg?: string
  headers?: Object
  body?: string
}

export interface CaseReportItemMetrics {
  renderRequestTime?: number
  renderAuthTime?: number
  requestTime?: number
  evalAssertionTime?: number
  totalTime?: number
}

export interface CaseResult {
  caseId?: string
  assert?: any
  context?: any
  request?: CaseResultRequest
  response?: CaseResultResponse
  statis?: CaseStatis
  metrics?: CaseReportItemMetrics
  result?: Object
}

export const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'TRACE']
export const PROTOCOLS = ['http', 'https']
export const ContentTypes = {
  JSON: 'application/json',
  X_WWW_FORM_URLENCODED: 'application/x-www-form-urlencoded',
  TEXT_PLAIN: 'text/plain',
}

export interface ApiImport {
  openApi?: string
  group?: string
  project?: string
  preview?: boolean
}

export interface AuthorizationData {
  // CommonSign
  appKey?: string
  appSecret?: string
  // SSO Token
  cookie?: string
  header?: string
  username?: string
  password?: string
}

export interface AuthorizeAndValidate {
  type?: string
  description?: string
}

export interface Authorization {
  type?: string
  data?: AuthorizationData
}

export interface Environment extends BaseDoc {
  group?: string
  project?: string
  auth?: Authorization
  namespace?: string
  enableProxy?: boolean
  custom?: KeyValueObject[]
}

export interface IndexResultData {
  result?: string
  _id?: string
  _index?: string
  _type?: string
  _version?: number
}


export interface JobTrigger {
  project?: string
  group?: string
  startNow?: boolean
  startDate?: number
  endDate?: number
  repeatCount?: number
  interval?: number
  cron?: string
  triggerType?: string
}

export interface Job extends BaseDoc {
  classAlias?: string
  createdAt?: string
  group?: string
  project?: string
  scheduler?: string
  jobData?: JobData
  trigger?: JobTrigger[]
}

export interface JobReportData {
  dayIndexSuffix?: string
  cases?: CaseReportItem[]
  scenarios?: ScenarioReportItem[]
  ext?: Object
}

export interface JobReport extends BaseDoc {
  scheduler?: string
  group?: string
  project?: string
  type?: string
  jobId?: string
  jobName?: string
  classAlias?: string
  startAt?: string
  endAt?: string
  elapse?: number
  result?: string
  errorMsg?: string
  node?: string
  data?: JobReportData
}

export interface JobExecDesc {
  job?: Job
  report?: JobReport
}

export interface CaseReportItem {
  id?: string
  title?: string
  status?: string
  msg?: string
  result?: CaseResult
}

export interface ScenarioReportItem {
  id?: string
  title?: string
  status?: string
  msg?: string
}

export interface JobReportData {
  cases?: CaseReportItem[]
  scenarios?: ScenarioReportItem[]
  ext?: Object
}

export interface QueryCase {
  isParrent?: boolean
  api?: string
  project?: string
  group?: string
  text?: string
  from?: number
  size?: number
}

export interface QueryJobReport {
  scheduler?: string
  group?: string
  project?: string
  text?: string
  classAlias?: string
  type?: string
  from?: number
  size?: number
}

export interface IndexDocResponse {
  id?: string
}

export interface UpdateDocResponse {
  id?: string
  result?: string
}

export interface Assertion {
  name?: string
  description?: string
}
