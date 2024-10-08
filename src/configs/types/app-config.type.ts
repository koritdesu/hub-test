interface ConfigDefinition<T = unknown> {
  name: string;
  type: T;
}

export type AppConfig<T extends ConfigDefinition[]> = {
  readonly [K in T[number] as K['name']]: K['type'];
};
