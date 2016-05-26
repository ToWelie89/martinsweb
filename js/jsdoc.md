## Introduction

This is the Javascript documentation of [my personal/portfolio website](http://martinsonesson.se).

## Namespaces
    /**
     * @namespace (Namespace Name)
     * @description An informative description of the namespace.
     */

## Custom Types
Use `@typedef` to document object literals `{}`. This creates a "virtual" object type that only exists in JSDoc which can be referenced using `{@link (Type Name)}`.

    /**
     * @typedef (Type Name)
     * @description An informative description of the custom type.
     * @property {(Type)} (fieldN) - Description of the custom types field.
     */

## Constructors
    /**
     * @constructor (Constructor Name)
     * @memberof (Namespace Name)
     * @description An informative description of the constructor.
     * @param {(Type)} (depN) - Description of the external dependency.
     */

## Fields
Use `#, ~ or .` for documenting scoping.

    /**
     * An informative description of the field.
     * @member {(Type)} (Namespace).(Constructor Name).#(Field Name)
     * @default (Default Value)
     */

## Methods/Functions
Use `#, ~ or .` for documenting scoping.

    /**
     * @function (Namespace).(Constructor Name).#(Function Name)
     * @description An informative description of the method/function.
     * @param {(Type)} (paramN) - Description of the parameter.
     * @returns {(Type)} Description of the returned object. (Omit @returns if void/undefined is returned.)
     */

## Arguments/Returns
Sometimes we inject or return objects (named and literals). Named objects should be documented using the Constructor guidelines. For object literals (e.g. `{}`) either us a custom type definition (`@typedef`) or specify the literals fields using `@property`.

    /**
     * @function (Function Name)
     * ...
     * @param {Object} (paramN) - Description of the object.
     * @property {(Type)} (paramN).(fieldN) - Description of the objects field.
     * @returns {Object} (obj) - Description of the returned object.
     * @property {(Type)} (obj).(fieldN) - Description of the objects field.
     */

## Promises
There is no standard way of documenting Promises in JSDoc. Therefore we have settled on `{Promise<(Type)|Error>}` to document `resolve` and `reject` data.

    /**
     * @function (Function Name)
     * ...
     * @returns {Promise<(Type)|Error>} A description of the data contained in the returned promise.
     */
