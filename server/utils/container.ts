import {
  type AwilixContainer,
  createContainer,
  asClass,
} from "awilix";

export default function container<D extends Dependencies>(dependencies: D): Container<D> {
  const container: AwilixContainer<D> = createContainer({
    injectionMode: "CLASSIC",
    strict: true,
  });

  for (const name in dependencies) {
    if (dependencies[name])
      container.register(
        camelCase(name),
        asClass(dependencies[name]).singleton()
      );
  }

  const resolver = (<K extends keyof D & string>(
    name: K,
    overrides: Record<string, unknown> = {}
  ): InstanceType<D[K]> => {
    const className = pascalCase(name);

    if (!dependencies[className]) {
      throw new Error(`Dependency "${name}" is not registered.`);
    }

    return container.build(asClass(dependencies[className]).inject(() => overrides));
  }) as Container<D>;

  return Object.assign(resolver, container.cradle);
}
