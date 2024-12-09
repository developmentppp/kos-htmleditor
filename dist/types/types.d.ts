/// <reference types="react" />
export interface HTMLEditorProps extends AbstractFieldProps<any> {
    className?: string;
    error?: any;
    tabIndex?: number;
    setEditorRef?: (editorRef: any) => void;
    setResizeEditor?: (resize: any) => void;
    focusOnLoad?: boolean;
    expandToParent?: boolean;
}
export interface GenericFieldProps {
    field?: CFormField | undefined;
    label?: JSX.Element | string;
    comment?: IFormComment | null | undefined;
    tooltip?: JSX.Element | string | undefined;
    description?: string | undefined;
    className?: string;
    labelClassName?: string;
    required?: boolean;
}
export type AbstractFieldProps<T> = {
    name?: string;
    id?: string;
    layoutMode?: boolean;
    value?: T;
    onChange?: (e: any, data: any) => void;
    onBlur?: (e: any, data: any) => void;
    disabled?: boolean;
    options?: any;
    tabIndex?: number;
    placeholder?: string | undefined;
} & GenericFieldProps;
export declare class CFilterSet {
    _data: IFilterSet;
    constructor(initData?: IFilterSet);
    get uuid(): string;
    get data(): {
        filter: {
            filterValue: {
                values: any[] | null;
                comparator: string;
                negated: boolean;
            };
            uuid: string;
            label: string;
            negatable: boolean;
            disabled?: boolean | undefined;
            type: TFilterDefinitionType;
            relatedColumn: string;
            comparators: any[];
        }[];
        uuid: string;
        label: string;
        color: string;
        global: boolean;
        id: string;
    };
    get id(): string;
    get label(): string;
    get color(): string;
    get global(): boolean;
    get filter(): CFilterDefinition[];
    set uuid(uuid: string);
    set id(id: string);
    set color(color: string);
    set global(global: boolean);
    set label(label: string);
    set filter(filter: CFilterDefinition[]);
    createUuid(): void;
    parseData(initData: any): void;
}
export declare class CFilterDefinition {
    _data: IFilterDefinition;
    constructor(initData?: IFilterDefinition);
    get uuid(): string;
    get disabled(): boolean;
    get data(): {
        filterValue: {
            values: any[] | null;
            comparator: string;
            negated: boolean;
        };
        uuid: string;
        label: string;
        negatable: boolean;
        disabled?: boolean | undefined;
        type: TFilterDefinitionType;
        relatedColumn: string;
        comparators: any[];
    };
    get cleanedFilterValue(): {
        values: any[] | null;
        comparator: string;
        negated: boolean;
    };
    get cleanedValues(): any[] | null;
    get label(): string;
    get negatable(): boolean;
    get type(): TFilterDefinitionType;
    get relatedColumn(): string;
    get comparators(): string[];
    get isPkz(): boolean;
    get pkzRank(): string | null;
    get isCostBearer(): boolean;
    get costBearerRank(): string | null;
    get costBearerNumberRank(): string | null;
    get costBearerDescriptionRank(): string | null;
    get costBearerGroupRank(): string | null;
    get isStandard(): boolean;
    get filterValue(): IBaseFilterValue;
    get comparator(): string;
    get values(): any[];
    get negated(): boolean;
    set uuid(uuid: string);
    set disabled(disabled: boolean);
    set label(label: string);
    set negatable(negatable: boolean);
    set type(type: TFilterDefinitionType);
    set relatedColumn(relatedColumn: string);
    set filterValue(filterValue: IBaseFilterValue);
    set comparator(comparator: string);
    set values(values: any[]);
    set negated(negated: boolean);
    createUuid(): void;
    parseData(initData: any): void;
}
export interface IFilterSetTemplate {
    id: string;
    filter: CFilterDefinition[];
}
export interface IEditElementFilter extends IBaseElementFilter {
    volatileFilter: CFilterSet | null;
}
export interface ISelectedFilterSet {
    uuid: string;
    negated: boolean;
}
export interface IFilterSet extends IFilterSetTemplate {
    uuid: string;
    label: string;
    color: string;
    global: boolean;
}
export type TFilterDefinitionType = "number" | "string" | "dropdown" | "date" | "mode-date" | "lookup";
export interface IBaseFilterValue {
    comparator: string;
    values: any[] | null;
    negated: boolean;
}
export interface IFilterValue {
    uuid: string;
    filterValue: IBaseFilterValue;
}
export type TDateFilterValue = IBaseFilterValue & {
    relative: boolean;
};
export type TModeDateFilterValue = TDateFilterValue & {
    mode: string;
};
export interface IFilterDefinition {
    uuid: string;
    label: string;
    negatable: boolean;
    disabled?: boolean;
    type: TFilterDefinitionType;
    relatedColumn: string;
    comparators: any[];
    filterValue: IBaseFilterValue;
}
export type TFilterSetGroup = ISelectedFilterSet[];
export interface IBaseElementFilter {
    uuid: string;
    sqlFilter: string | null;
    sqlSelected: boolean;
    filterSetGroups: TFilterSetGroup[];
}
export interface IElementFilter extends IBaseElementFilter {
    volatileFilterValues: IFilterValue[];
}
export type TOptionValue = {
    text: string;
    value: string;
};
export interface INumberFilterDefinition extends IFilterDefinition {
    type: "number";
    comparators: ("empty" | "equals" | "<=" | "<" | ">=" | ">" | "between" | "contains")[];
}
export interface IStringFilterDefinition extends IFilterDefinition {
    type: "string";
    comparators: ("empty" | "equals" | "<=" | "<" | ">=" | ">" | "between" | "startsWith" | "endsWith" | "contains")[];
}
export interface IDropdownFilterDefinition extends IFilterDefinition {
    type: "dropdown";
    comparators: ("empty" | "equals" | "contains")[];
    options: TOptionValue[];
}
export interface ITemporalFilterDefinition extends IFilterDefinition {
    type: "date" | "mode-date";
    temporalFormat: string;
    comparators: ("empty" | "equals" | "<=" | "<" | ">=" | ">" | "between" | "contains")[];
    filterValue: TDateFilterValue;
}
export interface IModeTemporalFilterDefinition extends ITemporalFilterDefinition {
    type: "mode-date";
    modeOptions: TOptionValue[];
    filterValue: TModeDateFilterValue;
}
export interface ITimestamps {
    createdAt: string | null;
    createdBy?: string | null;
    modifiedAt: string | null;
    modifiedBy?: string | null;
    deletedAt: string | null;
    deletedBy?: string | null;
}
export interface IAbstractEntity {
    uuid: string | null;
    timestamps?: ITimestamps;
    layout?: any;
    permissions?: any;
    lockState?: any;
    tags?: string[];
}
export interface IFile {
    dataUri: string;
    mimetype?: string;
    filename?: string;
    filesize?: number;
    fileUuid?: string;
}
export interface IPlaceholderCategory {
    table: string;
    text: string;
    columns: IPlaceholder[];
}
export interface IPlaceholder {
    text: string;
    column: string;
}
export interface IContentEntry extends IAbstractEntity {
    id: number | null;
    title: string;
    description: string | null;
    contentString: string;
    type: string;
    subType?: string;
    filename: string;
    mimetype: string;
    additionalData: {
        [key: string]: any;
    };
    config: {
        [key: string]: any;
    } | null;
    createdAt?: string | null;
    createdBy?: string | null;
    deletedAt: string | null;
    deletedBy: string | null;
}
export declare enum ESchemaType {
    KOSMEHOME = "kosmehome",
    HTMLPAGE = "html_page",
    TIMELIN = "timeline",
    MESSENGER = "messenger",
    SETTINGS = "settings",
    KOSMENUE = "kosmenue",
    APPOINTMENTS = "appointments",
    KOSPLAN = "kosplan",
    MEDICATIONS = "medications",
    DOCUMENTATION = "documentation",
    WIDGET = "widget",
    CMS = "cms"
}
export interface ISchema {
    id: string;
    type: ESchemaType;
    title: string;
    navTitle: string | null;
    sort: string | null;
    sortFooter: string | null;
    icon: string;
    config: any | {};
    externalConfig: any | {};
}
export interface IVisibilityConfiguration {
    relative: boolean;
    rateBase: "arrivalDate" | "addedAt";
    rateValue: string | null;
    cronValue: string | null;
    hideOnSubmit: boolean;
    hideFor: string;
}
export type SchemaContextType = ISchema;
export declare enum EIFrameSecurityLevel {
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low"
}
export declare enum ENotificationStatus {
    NEW = "new",
    WAITING = "waiting",
    SCHEDULED = "scheduled",
    SENT = "sent",
    DELIVERED = "delivered",
    READ = "read",
    CONFIRMED = "confirmed",
    FAILED = "failed",
    DELETED = "deleted"
}
export declare enum ENotificationInAppDisplayType {
    MESSAGE = "message",
    BANNER = "banner",
    MODAL = "modal",
    CONFIRM = "confirm"
}
export declare enum ENotificationChannel {
    EMAIL = "email",
    PUSH = "push",
    INAPP = "inapp",
    SHORTMESSAGE = "shortmessage"
}
export declare enum ENotificationTopicLevel {
    INFO = "info",
    WARNING = "warning",
    IMPORTANT = "important"
}
export declare enum ENotificationLevelInherit {
    INHERIT = "inherit"
}
export type TNotificationLevel = ENotificationTopicLevel | ENotificationLevelInherit;
export interface IBaseNotification extends IAbstractEntity {
    level: TNotificationLevel;
    sentAt: string | null;
    status: ENotificationStatus;
}
export interface INotificationEnvelope extends IBaseNotification {
    plannedAt: string | null;
    recipients: string[];
    recipientsFilter: IElementFilter | null;
    topic: INotificationTopic | null;
}
export interface INotificationTopicChannel<T = any> {
    content: TNotificationContent | null;
    contentUuid: string | null;
    additionalContent?: T;
    type: ENotificationChannel;
}
export interface INotificationTopic extends IAbstractEntity {
    title: string;
    description: string | null;
    level: TNotificationLevel;
    channels: {
        [channel: string]: INotificationTopicChannel;
    };
}
export type TUserNotification = IBaseNotification & INotificationTopicChannel;
export interface INotification extends TUserNotification {
    channelType: ENotificationChannel;
}
export interface INotificationPushContentEntry extends IContentEntry {
    type: "push";
    additionalData: {
        title: string;
        image?: IFile;
        icon?: IFile;
        link?: string;
        tag?: string;
    };
}
export interface INotificationInAppContentEntry extends IContentEntry {
    type: "inapp";
    additionalData: {
        title: string;
        image?: IFile;
        displayType: ENotificationInAppDisplayType;
        embeddedContent?: {
            contentType: ESchemaType;
            contentUuid: string;
            schemaUuid?: string;
        };
    };
}
export type TNotificationContent = IContentEntry | INotificationPushContentEntry | INotificationInAppContentEntry;
export declare enum EFieldType {
    "unsupported" = "unsupported",
    "dropdown" = "dropdown",
    "number" = "number",
    "radio" = "radio",
    "text" = "text",
    "textarea" = "textarea",
    "password" = "password",
    "checkbox" = "checkbox",
    "date" = "date",
    "time" = "time",
    "datetime" = "datetime",
    "file" = "file",
    "fileupload" = "fileupload",
    "html" = "html",
    "rangedvalues" = "rangedvalues",
    "image" = "image",
    "editimage" = "editimage",
    "signature" = "signature",
    "diagnosis" = "diagnosis",
    "medication" = "medication",
    "content-html" = "content-html",
    "content-text" = "content-text",
    "content-image" = "content-image"
}
export interface IGenericParent {
    type: "main" | "cat" | "menu" | "block" | "field";
    title: string;
    id: string;
    children: (IMain | ICat | IMenu | IBlock | IFormContainer | IFormField)[];
}
export interface IMain extends IGenericParent {
    type: "main";
}
export interface ICat extends IGenericParent {
    type: "cat";
}
export interface IMenu extends IGenericParent {
    type: "menu";
}
export interface IBlock extends IGenericParent {
    type: "block";
    children: (IFormContainer | IFormField)[];
}
export declare enum EReturnType {
    "string" = "string",
    "integer" = "integer",
    "double" = "double",
    "boolean" = "boolean",
    "imageWithDesc" = "imageWithDesc",
    "image" = "image",
    "file" = "file",
    "diagnosis" = "diagnosis",
    "medication" = "medication",
    "date" = "date",
    "time" = "time",
    "datetime" = "datetime",
    "generator::uuid" = "generator::uuid",
    "generator::datetime:now" = "generator::datetime:now",
    "generator::date:now" = "generator::date:now",
    "generator::time:now" = "generator::time:now",
    "string[]" = "string[]",
    "integer[]" = "integer[]",
    "double[]" = "double[]",
    "boolean[]" = "boolean[]",
    "imageWithDesc[]" = "imageWithDesc[]",
    "image[]" = "image[]",
    "file[]" = "file[]",
    "diagnosis[]" = "diagnosis[]",
    "medication[]" = "medication[]",
    "date[]" = "date[]",
    "time[]" = "time[]",
    "datetime[]" = "datetime[]",
    "generator::uuid[]" = "generator::uuid[]",
    "generator::datetime:now[]" = "generator::datetime:now[]",
    "generator::date:now[]" = "generator::date:now[]",
    "generator::time:now[]" = "generator::time:now[]"
}
export declare const enum EPersistType {
    "string" = "string",
    "integer" = "integer",
    "double" = "double",
    "boolean" = "boolean",
    "blob" = "blob",
    "date" = "date",
    "time" = "time",
    "datetime" = "datetime"
}
export interface IOpForValue {
    operationType: "formPropertyOperation" | "restOperation";
}
export interface IRestOpForValue extends IOpForValue {
    operationType: "restOperation";
    url: string | null;
}
export interface IFormPropertyOpForValue extends IOpForValue {
    operationType: "formPropertyOperation";
    path: string | null;
    key: string | null;
}
export interface IFormDependency {
    uuid: string | null;
    operationForValue: IFormPropertyOpForValue | IRestOpForValue | null;
    dependencyValue: any;
    dependencyComparator: "equals" | "contains" | "!equals" | "!contains" | "<" | "<=" | "=" | ">=" | ">" | "!=";
    success: {
        path: string | null;
        value: any | null;
    };
    failure: {
        path: string | null;
        value: any | null;
    };
    evaluationTime: "immediately";
}
export interface IBasicProperties {
    hidden?: boolean;
    disabled?: boolean;
}
export interface IFormElement {
    formFactoryElementType: string;
    id: number | null;
    uuid: string | null;
    valueKey: string;
    mode: "design" | "legacy" | "advanced";
    label?: string;
    showFieldLabel?: boolean;
    style?: {};
    properties: IBasicProperties;
    configuration: {
        menueid: string;
        blockid: string;
        fieldid: string;
        signature: string;
        configKey: string;
        persistConfig: {
            table: string;
            dbOperation: "insert" | "update" | "merge" | "delete";
            order: number;
            generatedKeys: {};
            columns: {
                column: string;
                type: EPersistType;
                order: number;
                key: string;
                usedAsKey: boolean;
                elementSource: "constant" | "context" | "value";
                overrideStrategy: "always" | "existing_null" | "existing_not_null" | "new_not_null" | "new_not_null" | "never";
            }[];
            operations: {
                generatedOperation: string;
                operationType: "concat" | "replace" | "inverseReplace" | "copy" | "base64Decode" | "base64Encode" | "splitAndGet" | "move" | "remove" | "set" | "maskNumber";
                operationParameters: any[];
                operationArgs: {
                    type: "src" | "context" | "value" | "persist";
                    key: string;
                }[];
                operationTarget: {
                    type: "src" | "context" | "value" | "persist";
                    key: string;
                };
            }[];
        }[];
    };
    dependencies: CFormDependency[];
    licenseValidConfigs?: {};
}
export interface IFormField extends IFormElement {
    formFactoryElementType: "field";
    specProps?: {
        type: EFieldType;
        temporalFormat?: string;
        unit?: string;
        calculationFormula?: string;
        standardValue?: {
            min: number;
            max: number;
        };
        rangedValuesDelimiter?: string;
        step?: number;
        maxlength?: number;
        minlength?: number;
        max?: number;
        min?: number;
        pattern?: string;
        required?: boolean;
        inline: boolean;
        licenseIncluded?: boolean | true;
        global: boolean;
    };
    options?: CFormFieldOption[];
    tooltip: string;
    defaultValue: any;
    returnType: EReturnType;
}
export type IFormFieldOption = {
    text: string;
    value: any;
    properties: IBasicProperties;
    dependencies?: CFormDependency[];
};
export interface IAbstractFormContainer extends IFormElement {
    submitLabel?: string | null;
    formFactoryElementType: "container";
    type: TFormContainerType;
}
export interface IFormListContainer extends IAbstractFormContainer {
    childrenCount: number;
}
export interface IFormContainer extends IAbstractFormContainer {
    children: (CFormContainer | CFormField)[];
}
export type TFormContainerType = "tab" | "pane" | "step";
export type TFormStatus = "read" | "write" | "missing" | "signed" | "unsupported";
export interface IFormOverview {
    uuid: string;
    label: string;
    formStatus: TFormStatus;
    fieldStatus: "info" | "error" | "warning" | "done";
    type: "single" | "entry" | "list" | "unsupported";
    updatedAt: string;
    createdAt: string;
    patientUuid: string;
    children: IFormOverview[];
    parameters: IFormOverviewParameters;
    fieldData: any;
    fieldHeader: any;
}
export type IFormOverviewParameters = {
    formUuid: string;
    erfassId: string;
    patientUuid: string;
    lddatum: string;
    ldzeit: string;
    language: string;
    withContentString: string;
    tempSave?: boolean;
};
export declare const enum EFormCommentStatus {
    done = 0,
    info = 1,
    warning = 2,
    error = 3
}
export interface IFormComment {
    comment: string;
    status: EFormCommentStatus;
}
export interface IFormValues {
    parameters: {
        [key: string]: string;
    };
    values: {
        [key: string]: any;
    };
    comments: {
        [key: string]: IFormComment;
    };
}
declare abstract class CFormElement extends CElementWithDependencies {
    _data: IFormContainer | IFormField;
    constructor();
    abstract parseData(initData: IFormContainer | IFormField): void;
    get id(): number | null;
    get elementType(): "field" | "container";
    get isField(): boolean;
    get isContainer(): boolean;
    get label(): string;
    get showFieldLabel(): boolean;
    setLabel(label: string): void;
    specProp(prop: string): any | undefined;
    get uuid(): string | null;
    isSame(formElement: CFormElement | null): boolean;
    isSameByUuid(uuid: string | null): boolean;
    get required(): boolean;
    get global(): boolean;
    style: any | null;
    styleProp(prop: string): string | number | null;
    setStyleProp(prop: string, value: any): void;
    createUuid(): void;
    resetIdentities(): void;
    setIdentities(identities: {
        id: number | null;
        uuid: string;
    }): void;
    get estimatedSize(): {
        w: number;
        h: number;
    };
    setEstimatedSize(): void;
    get configuration(): any;
    get mainId(): string | null;
    get catId(): string | null;
    get menueId(): string | null;
    get valueKey(): string | null;
    get dependencyKey(): string | null;
    get licenseValidConfigs(): any | null;
    isLicenseIncluded(prop: string): boolean;
}
export declare class CFormContainer extends CFormElement {
    _data: IFormContainer;
    constructor(initData?: IFormContainer, type?: TFormContainerType, submitLabel?: string);
    parseData(initData: IFormContainer): void;
    resetIdentities(): void;
    updateIdentitiesDeep(identities: {
        [id: string]: string;
    }): void;
    get data(): any;
    get containerType(): TFormContainerType;
    get containerTypeLabel(): string | null;
    get containerTypeIcon(): any | null;
    get submitLabel(): string | null | undefined;
    setContainerType(type: TFormContainerType): void;
    setSubmitLabel(name: string): void;
    get isValid(): boolean;
    get hash(): string | null;
    flattenAllChildren(level?: number, excludeDataFields?: boolean, asData?: boolean): (CFormContainer | CFormField)[];
    get children(): (CFormContainer | CFormField)[];
    set children(children: (CFormContainer | CFormField)[]);
    get alignedChildren(): (CFormContainer | CFormField)[];
    get singleColumnAlignedChildren(): (CFormContainer | CFormField)[];
    indexOfChild(child: CFormContainer | CFormField): number;
    indexOfChildByUuid(uuid: string): number;
    getChildByUuid(uuid: string): CFormContainer | CFormField | null;
    hasChild(child: CFormContainer | CFormField | null): boolean;
    hasChildDeep(child: CFormContainer | CFormField | null): boolean;
    get hasChildren(): boolean;
    addChild(child: CFormContainer | CFormField): CFormContainer;
    replaceChild(child: CFormContainer | CFormField): boolean;
    replaceChildDeep(child: CFormContainer | CFormField): boolean;
    removeChild(uuid: string): CFormContainer;
    removeChildByIndex(index: number): CFormContainer;
    expandChild(uuid: string): CFormContainer;
    shrinkChild(uuid: string): CFormContainer;
    get firstFieldWithMenueId(): CFormField | null;
    updateMetaData(mainid: string, catid: string, menueid: string): CFormContainer;
    get currentLayout(): any[];
    updateLayout(layout: any[]): CFormContainer;
}
export declare class CFormField extends CFormElement {
    _data: IFormField;
    _currentValue: EReturnType | undefined;
    constructor(initData?: IFormField);
    parseData(initData: IFormField): void;
    get data(): any;
    get valueKey(): any | null;
    get fieldTypeLabel(): string | null;
    get fieldTypeIcon(): any | null;
    options: CFormFieldOption[];
    replaceOption(option: CFormFieldOption): boolean;
    get returnType(): EReturnType | null;
    get fieldType(): EFieldType | null;
    get isInline(): boolean;
    get estimatedSize(): {
        w: number;
        h: number;
    };
    specProp(prop: string): any | undefined;
    setSpecProp(prop: string, value: any): boolean;
    defaultValue: EReturnType | undefined;
    get uninitializedValue(): string | number | any[] | null;
    currentValue: EReturnType | undefined;
    get returnValue(): EReturnType | (EReturnType | null)[] | null;
    get returnValueAsString(): EReturnType.string | EReturnType.string[];
    get returnValueAsInteger(): EReturnType.integer | (EReturnType.integer | null)[] | null;
    get returnValueAsBoolean(): EReturnType.boolean | EReturnType.boolean[];
    get returnValueAsDouble(): EReturnType.double | (EReturnType.double | null)[];
    get returnValueAsFile(): EReturnType.file | (EReturnType.file | null)[];
    setGeneratorValue(generator: EReturnType | null, value: any | any[]): EReturnType | EReturnType[] | null;
    get isValid(): boolean;
    get hasEmptyValue(): boolean;
    isEmpty(value: string | number | any[] | undefined): boolean;
    get isGeneratorField(): boolean;
    get isArrayField(): boolean;
    get isNumberField(): boolean;
    get isBooleanField(): boolean;
    get isStringField(): boolean;
    get isDateTimeField(): boolean;
}
export declare class CFormDependency {
    _data: IFormDependency;
    constructor(initData?: IFormDependency);
    get data(): IFormDependency;
    get uuid(): string | null;
    createUuid(): void;
    resetIdentities(): void;
    setIdentities(properties: {
        id: string | null;
        uuid: string | null;
    }): void;
    parseData(initData: IFormDependency): void;
    isSame(dependency: CFormDependency): boolean;
    isSameByUuid(uuid: string | null): boolean;
    get isValid(): boolean;
    get operationForValue(): IFormPropertyOpForValue | IRestOpForValue | null;
    get formPropertyOperationKey(): string | null;
    get formPropertyOperationPath(): string | null;
    get restOperationUrl(): string | null;
    get targetType(): string | null;
    get targetValueKey(): string | null;
    get targetValueType(): string | null;
    get operator(): string | null;
    get compareValue(): any;
    get compareValueLabel(): string;
    get onTrue(): {
        path: string | null;
        value: any | null;
    };
    get onTruePath(): string | null;
    get onTrueValue(): any;
    get onTrueType(): string | null;
    get onTrueValueLabel(): string;
    get onFalse(): {
        path: string | null;
        value: any | null;
    };
    get onFalsePath(): string | null;
    get onFalseValue(): any;
    get onFalseType(): string | null;
    get onFalseValueLabel(): string;
    get evaluationTime(): string;
}
export declare class CFormFieldOption extends CElementWithDependencies {
    _data: IFormFieldOption;
    _parentField: CFormField;
    constructor(initData: IFormFieldOption, parentField: CFormField);
    parseData(initData: IFormFieldOption): void;
    get data(): any;
    get value(): any;
    get text(): string;
    get dependencyKey(): string;
}
export declare class CElementWithDependencies {
    _data: any;
    _initialHidden: boolean;
    _initialDisabled: boolean;
    constructor();
    parseData(initData: any): void;
    get data(): any;
    get initialHidden(): boolean;
    get hidden(): boolean;
    get initialDisabled(): boolean;
    get disabled(): boolean;
    get isField(): boolean;
    get isContainer(): boolean;
    get hasDependencies(): boolean;
    get hasValidDependencies(): boolean;
    get dependencies(): CFormDependency[];
    set hidden(hidden: boolean);
    set disabled(disabled: boolean);
    indexOfDependency(dependency: CFormDependency): number;
    indexOfDependencyByUuid(uuid: string | null): number;
    addDependency(dependency: CFormDependency): void;
    replaceDependency(dependency: CFormDependency): boolean;
    removeDependency(uuid: string): CElementWithDependencies;
    removeDependencyByIndex(index: number): CElementWithDependencies;
}
export {};
