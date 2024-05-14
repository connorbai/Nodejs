import { metadataArgsStorage } from "./global-args-storage";

export function ColumnName(options) {
    return function (object, propertyName) {
        let type
        if (!options)
            options = {};
        const reflectMetadataType = Reflect && Reflect.getMetadata
            ? Reflect.getMetadata("design:type", object, propertyName)
            : undefined;
        if (!type && reflectMetadataType)
            type = reflectMetadataType;
        metadataArgsStorage.columns.push({
            target: object.constructor,
            propertyName: propertyName,
            mode: "regular",
            options: {
                ...options,
                type
            },
        });
    };
}