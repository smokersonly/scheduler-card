import { Time, Days } from './date-time';
import { LovelaceCardEditor, LovelaceCardConfig } from 'custom-card-helpers';
import { HassEntity, HassEntityAttributeBase } from 'home-assistant-js-websocket';

declare global {
  interface HTMLElementTagNameMap {
    'scheduler-card-editor': LovelaceCardEditor;
  }
}

export interface Dictionary<TValue> {
  [id: string]: TValue;
}
export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/* hass objects */

// export interface HassEntity {
//   entity_id: string;
//   state: any;
//   attributes: {
//     friendly_name?: string;
//     icon?: string;
//     supported_features?: number;
//     actions?: HassAction[];
//     entries?: string[];
//     next_trigger?: string;
//     conditions?: Condition[];
//     options?: OptionConfig;
//   };
// }

export interface ScheduleEntity extends HassEntity {
  attributes: HassEntityAttributeBase & {
    actions: HassAction[];
    entries: string[];
    next_trigger?: string;
    conditions?: Condition[];
    options?: OptionConfig;
  }
}

/* groups */

export interface GroupElement {
  id: string;
  entities: string[];
  name: string;
  icon: string;
}

export interface GroupConfig {
  name: string;
  icon?: string;
  include: string[];
  exclude?: string[];
}

/* entities */

export interface EntityElement extends EntityConfig {
  id: string;
  name?: string;
  icon?: string;
  actions: ActionConfig[];
  exclude_actions?: string[];
  states?: StatesConfig;
}

export interface EntityConfig {
  name?: string;
  icon?: string;
  actions?: ActionConfig[];
  states?: StatesConfig;
}

/* actions */

export interface ActionConfig {
  name?: string;
  service: string;
  service_data?: Dictionary<any>;
  icon?: string;
  variable?: AtLeast<LevelVariableConfig | ListVariableConfig, 'field'>;
  supported_feature?: number;
}

export interface ActionElement extends ActionConfig {
  id: string;
  name?: string;
  service: string;
  service_data?: Dictionary<any>;
  icon?: string;
  variable?: LevelVariableConfig | ListVariableConfig;
  supported_feature?: number;
}

/* action variables */

export enum EVariableType {
  Level = 'LEVEL',
  List = 'LIST',
}

export interface LevelVariable {
  value: number | null;
  enabled: boolean;
  type: EVariableType;
}

export interface ListVariable {
  value: string | null;
  type: EVariableType;
}

export interface LevelVariableConfig {
  field: string;
  unit: string;
  name?: string;
  min: number;
  max: number;
  step: number;
  optional: boolean;
  type: EVariableType;
}

export interface ListVariableOption {
  value: string;
  icon?: string;
  name?: string;
}

export interface ListVariableConfig {
  field: string;
  name?: string;
  options: ListVariableOption[];
  supported_feature?: number;
  type: EVariableType;
}

/* entries */

export interface Entry {
  time: Time;
  endTime?: Time;
  days: Days;
  action: string;
  entity: string;
  variable?: LevelVariable | ListVariable;
  conditions?: ConditionConfig;
  options?: OptionConfig;
}

export interface ImportedEntry {
  time: Time;
  endTime?: Time;
  days: Days;
  actions: number[];
  conditions?: {
    type: EConditionType;
    items: number[];
  };
  options?: number[];
}

/* config */

export interface CardConfig extends LovelaceCardConfig {
  discover_existing?: boolean;
  standard_configuration?: boolean;
  title?: boolean | string;
  am_pm?: boolean;
  time_step?: number;
  first_weekday?: string;
  show_header_toggle?: boolean;
  include?: string[];
  exclude?: string[];
  groups?: GroupConfig[];
  customize?: Dictionary<EntityConfig & { exclude_actions?: string[] }>;
}

/* interface */

export interface HassAction {
  service: string;
  entity: string;
  service_data?: Dictionary<any>;
}

export interface HassEntry {
  time?: Time;
  days?: number[];
  actions: number[];
  conditions?: {
    type: 'or' | 'and';
    list: number[];
  };
  options?: number[];
}

export interface HassData {
  entries: HassEntry[];
  actions: HassAction[];
  conditions?: Condition[];
}

/* other */

export enum EConditionMatchType {
  Equal = 'is',
  Unequal = 'not',
  Below = 'below',
  Above = 'above',
}

export interface Condition {
  entity: string;
  match_type: EConditionMatchType;
  state: string | number;
}

export enum EConditionType {
  Any = 'or',
  All = 'and',
}

export interface ConditionConfig {
  type: EConditionType;
  items: Condition[];
}


export interface OptionConfig {
  run_once?: boolean;
}

export type StatesConfig = string[] | { min: number; max: number; step?: number; unit?: string };
