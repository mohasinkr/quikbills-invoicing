function getDirtyValues<T extends Record<string, any>>(
    dirtyFields: Partial<Record<keyof T, boolean>>,
    values: T
  ): Partial<T> & { id: number } {
    const dirtyValues = Object.keys(dirtyFields).reduce((acc, key) => {
      if (dirtyFields[key]) {
        acc[key as keyof T] = values[key];
      }
      return acc;
    }, {} as Partial<T>);
  
    // Always include the `id` field
    return { ...dirtyValues, id: values.id };
  }