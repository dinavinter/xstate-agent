// To parse this data:
//
//   import { Convert, Screen } from "./file";
//
//   const screen = Convert.toScreen(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Screen {
    /**
     * CSS style to apply
     */
    css?: string;
    /**
     * Style of the dialog when the screen-set is presented in a dialog.
     */
    "data-dialog-style"?: DataDialogStyle;
    /**
     * Defines the height of the screen-set when presented in a dialog.
     */
    "data-height"?: number;
    /**
     * Enables responsive design for the screen-set.
     */
    "data-responsive"?: boolean;
    /**
     * Specifies the initial screen to display within the screen-set.
     */
    "data-start-screen"?: string;
    /**
     * Defines the width of the screen-set when presented in a dialog.
     */
    "data-width"?: number;
    /**
     * A unique identifier for the screen-set.
     */
    id?:      string;
    links?:   string[];
    screens?: Array<any[] | boolean | number | number | null | ScreenObject | string> | boolean | number | number | { [key: string]: any } | null | string;
    [property: string]: any;
}

/**
 * Style of the dialog when the screen-set is presented in a dialog.
 */
export enum DataDialogStyle {
    Classic = "classic",
    Legacy = "legacy",
    Modern = "modern",
    None = "none",
}

export interface ScreenObject {
    /**
     * Specifies the next screen to display upon completion of the current screen.
     */
    "data-next-screen"?: string;
    /**
     * Specifies the screen to display upon completion of account linking.
     */
    "data-on-accounts-linked-screen"?: string;
    /**
     * Specifies the screen to display when a conflicting login identifier is detected during
     * social login.
     */
    "data-on-existing-login-identifier-screen"?: string;
    /**
     * Specifies the screen to display when a password required during password-less
     * registration ( social login, otp ,fido, etc).
     */
    "data-on-missing-loginid-screen"?: string;
    /**
     * Specifies the screen to display when a  code is sent to the user's email for verification.
     */
    "data-on-pending-email-verification-code"?: string;
    /**
     * Specifies the screen to display when a pending password change is triggered.
     */
    "data-on-pending-password-change-screen"?: string;
    /**
     * Specifies the screen to display when a pending recent login is triggered.
     */
    "data-on-pending-recent-login-screen"?: string;
    /**
     * Specifies the screen to display when a pending registration is triggered during
     * registration or login.
     */
    "data-on-pending-registration-screen"?: string;
    /**
     * Specifies the screen to display when a pending TFA registration is triggered during
     * registration or login.
     */
    "data-on-pending-tfa-registration-screen"?: string;
    /**
     * Specifies the screen to display when a pending TFA is triggered during registration or
     * login.
     */
    "data-on-pending-tfa-verification-screen"?: string;
    /**
     * Specifies the screen to display when a pending verification is triggered during
     * registration or login.
     */
    "data-on-pending-verification-screen"?: string;
    forms?:                                 FormElement[];
    /**
     * A unique identifier for the screen
     */
    id?: string;
    [property: string]: any;
}

export interface FormElement {
    /**
     * The behavior of the form.
     */
    behavior: Behavior;
    children: ChildElement[];
    /**
     * A boolean attribute with a default value "false". When the value is set to "true" and all
     * the required fields in the form have data (from the database), the form is automatically
     * skipped and behaves as if it was successfully submitted and processed. SAP Customer Data
     * Cloud loads the data-on-success-screen if defined, or finishes the flow and hides the
     * screen-set. The data-auto-skip logic also takes into consideration the data-empty-fields
     * settings, so a screen may not be skipped if it has a container that has missing required
     * fields and passes all other defined conditions (so the container is visible).
     */
    "data-auto-skip"?: boolean;
    /**
     * When specified, this attribute overrides the data-on-success next screen attribute and
     * allows specifying a different next screen when the form is successfully submitted vs.
     * when the screen is auto-skipped. If this attribute is not specified, then the next screen
     * for both cases is determined by the data-on-success attribute.
     */
    "data-on-auto-skip-screen"?: string;
    /**
     * Indicates the next screen to display when the user is missing a login identity.
     */
    "data-on-missing-loginid-screen"?: string;
    /**
     * Indicates the next screen to display when a screen in a different screen-set was skipped,
     * returning control to the current screen-set.
     */
    "data-on-screenset-skipped-screen"?: string;
    /**
     * Defines which screen to switch in case of successful submission and processing of the
     * form. If not specified, after successful processing of the form, the flow finishes and
     * SAP Customer Data Cloud hides the screen-set (see also Removing the Screen-Set section).
     */
    "data-on-success-screen"?: string;
    /**
     * A brief description of the form.
     */
    description?: string;
    [property: string]: any;
}

/**
 * The behavior of the form.
 */
export enum Behavior {
    GigyaChangePasswordForm = "gigya-change-password-form",
    GigyaCompleteRegistrationForm = "gigya-complete-registration-form",
    GigyaForgotPasswordForm = "gigya-forgot-password-form",
    GigyaForgotPasswordSuccessForm = "gigya-forgot-password-success-form",
    GigyaLoginForm = "gigya-login-form",
    GigyaMobileLoginForm = "gigya-mobile-login-form",
    GigyaMobileLoginVerification = "gigya-mobile-login-verification",
    GigyaOtpSendCodeForm = "gigya-otp-send-code-form",
    GigyaOtpUpdateForm = "gigya-otp-update-form",
    GigyaPasswordChangeRequiredForm = "gigya-password-change-required-form",
    GigyaRegisterForm = "gigya-register-form",
    GigyaResetPasswordForm = "gigya-reset-password-form",
    GigyaResetPasswordSuccessForm = "gigya-reset-password-success-form",
    GigyaTfaEditForm = "gigya-tfa-edit-form",
    GigyaTfaForm = "gigya-tfa-form",
    GigyaTfaRegistrationForm = "gigya-tfa-registration-form",
    GigyaTfaVerificationForm = "gigya-tfa-verification-form",
    GigyaUpdateProfileForm = "gigya-update-profile-form",
    GigyaVerificationPendingForm = "gigya-verification-pending-form",
    GigyaVerificationSentForm = "gigya-verification-sent-form",
}

/**
 * Represents a container that can have multiple conditional visibility rules.
 */
export interface ChildElement {
    conditions?: ConditionElement[];
    id?:         string;
    innerHtml?:  string;
    /**
     * html tag
     */
    tag?: string;
    [property: string]: any;
}

/**
 * A single conditional rule for a container.
 */
export interface ConditionElement {
    type?:  Type;
    value?: Value;
    [property: string]: any;
}

/**
 * The type of condition that can be applied to a container.
 */
export enum Type {
    DataAfterDate = "data-after-date",
    DataApikeys = "data-apikeys",
    DataBeforeDate = "data-before-date",
    DataCondition = "data-condition",
    DataDomains = "data-domains",
    DataEmptyFields = "data-empty-fields",
    DataLoginIdentities = "data-login-identities",
    DataProb = "data-prob",
}

/**
 * The value of a condition, including the rule as a JavaScript expression and optional
 * parameters.
 */
export interface Value {
    params?: { [key: string]: string };
    rule?:   string;
    [property: string]: any;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toScreen(json: string): Screen {
        return cast(JSON.parse(json), r("Screen"));
    }

    public static screenToJson(value: Screen): string {
        return JSON.stringify(uncast(value, r("Screen")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Screen": o([
        { json: "css", js: "css", typ: u(undefined, "") },
        { json: "data-dialog-style", js: "data-dialog-style", typ: u(undefined, r("DataDialogStyle")) },
        { json: "data-height", js: "data-height", typ: u(undefined, 3.14) },
        { json: "data-responsive", js: "data-responsive", typ: u(undefined, true) },
        { json: "data-start-screen", js: "data-start-screen", typ: u(undefined, "") },
        { json: "data-width", js: "data-width", typ: u(undefined, 3.14) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a("")) },
        { json: "screens", js: "screens", typ: u(undefined, u(a(u(a("any"), true, 3.14, 0, null, r("ScreenObject"), "")), true, 3.14, 0, m("any"), null, "")) },
    ], "any"),
    "ScreenObject": o([
        { json: "data-next-screen", js: "data-next-screen", typ: u(undefined, "") },
        { json: "data-on-accounts-linked-screen", js: "data-on-accounts-linked-screen", typ: u(undefined, "") },
        { json: "data-on-existing-login-identifier-screen", js: "data-on-existing-login-identifier-screen", typ: u(undefined, "") },
        { json: "data-on-missing-loginid-screen", js: "data-on-missing-loginid-screen", typ: u(undefined, "") },
        { json: "data-on-pending-email-verification-code", js: "data-on-pending-email-verification-code", typ: u(undefined, "") },
        { json: "data-on-pending-password-change-screen", js: "data-on-pending-password-change-screen", typ: u(undefined, "") },
        { json: "data-on-pending-recent-login-screen", js: "data-on-pending-recent-login-screen", typ: u(undefined, "") },
        { json: "data-on-pending-registration-screen", js: "data-on-pending-registration-screen", typ: u(undefined, "") },
        { json: "data-on-pending-tfa-registration-screen", js: "data-on-pending-tfa-registration-screen", typ: u(undefined, "") },
        { json: "data-on-pending-tfa-verification-screen", js: "data-on-pending-tfa-verification-screen", typ: u(undefined, "") },
        { json: "data-on-pending-verification-screen", js: "data-on-pending-verification-screen", typ: u(undefined, "") },
        { json: "forms", js: "forms", typ: u(undefined, a(r("FormElement"))) },
        { json: "id", js: "id", typ: u(undefined, "") },
    ], "any"),
    "FormElement": o([
        { json: "behavior", js: "behavior", typ: r("Behavior") },
        { json: "children", js: "children", typ: a(r("ChildElement")) },
        { json: "data-auto-skip", js: "data-auto-skip", typ: u(undefined, true) },
        { json: "data-on-auto-skip-screen", js: "data-on-auto-skip-screen", typ: u(undefined, "") },
        { json: "data-on-missing-loginid-screen", js: "data-on-missing-loginid-screen", typ: u(undefined, "") },
        { json: "data-on-screenset-skipped-screen", js: "data-on-screenset-skipped-screen", typ: u(undefined, "") },
        { json: "data-on-success-screen", js: "data-on-success-screen", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
    ], "any"),
    "ChildElement": o([
        { json: "conditions", js: "conditions", typ: u(undefined, a(r("ConditionElement"))) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "innerHtml", js: "innerHtml", typ: u(undefined, "") },
        { json: "tag", js: "tag", typ: u(undefined, "") },
    ], "any"),
    "ConditionElement": o([
        { json: "type", js: "type", typ: u(undefined, r("Type")) },
        { json: "value", js: "value", typ: u(undefined, r("Value")) },
    ], "any"),
    "Value": o([
        { json: "params", js: "params", typ: u(undefined, m("")) },
        { json: "rule", js: "rule", typ: u(undefined, "") },
    ], "any"),
    "DataDialogStyle": [
        "classic",
        "legacy",
        "modern",
        "none",
    ],
    "Behavior": [
        "gigya-change-password-form",
        "gigya-complete-registration-form",
        "gigya-forgot-password-form",
        "gigya-forgot-password-success-form",
        "gigya-login-form",
        "gigya-mobile-login-form",
        "gigya-mobile-login-verification",
        "gigya-otp-send-code-form",
        "gigya-otp-update-form",
        "gigya-password-change-required-form",
        "gigya-register-form",
        "gigya-reset-password-form",
        "gigya-reset-password-success-form",
        "gigya-tfa-edit-form",
        "gigya-tfa-form",
        "gigya-tfa-registration-form",
        "gigya-tfa-verification-form",
        "gigya-update-profile-form",
        "gigya-verification-pending-form",
        "gigya-verification-sent-form",
    ],
    "Type": [
        "data-after-date",
        "data-apikeys",
        "data-before-date",
        "data-condition",
        "data-domains",
        "data-empty-fields",
        "data-login-identities",
        "data-prob",
    ],
};
