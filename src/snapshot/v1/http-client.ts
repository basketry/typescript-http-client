/**
 * This code was generated by @basketry/typescript-http-client@{{version}}
 *
 * Changes to this file may cause incorrect behavior and will be lost if
 * the code is regenerated.
 *
 * To make changes to the contents of this file:
 * 1. Edit source/path.ext
 * 2. Run the Basketry CLI
 *
 * About Basketry: https://github.com/basketry/basketry/wiki
 */

import * as types from './types';
import * as validators from './validators';

export interface BasketryExampleOptions {
  root?: string;
}

export interface Fetch {
  <T>(
    resource: string,
    init?: {
      method?: 'DELETE' | 'POST' | 'PUT';
      headers?: Record<string, string>;
      body?: string;
    },
  ): Promise<{ json(): Promise<T>; status: number }>;
}

function lpad(n: number, len: number): string {
  const x = `${n}`;
  return x.length === len ? x : `${'0'.repeat(len)}${x}`.slice(-len);
}

function rpad(n: number, len: number): string {
  const x = `${n}`;
  return x.length === len ? x : `${'0'.repeat(len)}${x}`.slice(len);
}

function formatDate(date: Date): string {
  return `${lpad(date.getUTCFullYear(), 4)}-${lpad(
    date.getUTCMonth() + 1,
    2,
  )}-${lpad(date.getUTCDate(), 2)}`;
}

function formatDateTime(date: Date): string {
  return `${formatDate(date)}T${lpad(date.getUTCHours(), 2)}:${lpad(
    date.getUTCMinutes(),
    2,
  )}:${lpad(date.getUTCSeconds(), 2)}.${rpad(date.getMilliseconds(), 3)}Z`;
}

export class HttpGizmoService implements types.GizmoService {
  constructor(
    private readonly fetch: Fetch,
    private readonly auth: {
      oauth2Auth?: { accessToken: string };
    },
    private readonly options?: BasketryExampleOptions,
  ) {}

  /**
   * Only has a summary
   */
  async getGizmos(params?: { search?: string }): Promise<types.GizmosResponse> {
    const errors = validators.validateGetGizmosParams(params);
    if (errors) throw errors;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.auth.oauth2Auth) {
      headers.authorization = `Bearer ${this.auth.oauth2Auth.accessToken}`;
    }

    const query: string[] = [];
    if (typeof params?.search !== 'undefined') {
      query.push(`search=${encodeURIComponent(params.search)}`);
    }

    let prefix = '';
    if (this.options?.root) {
      prefix = this.options.root;
      if (!prefix.startsWith('/')) prefix = `/${prefix}`;
    }

    const path = [`${prefix}/gizmos`, query.join('&')].join('?');

    const { json, status } = await this.fetch<types.GizmosResponse>(path, {
      headers,
    });

    if (status !== 200) {
      throw new Error('Invalid response code');
    }

    const response = await json();

    const responseValidationErrors =
      validators.validateGizmosResponse(response);
    if (responseValidationErrors) throw responseValidationErrors;

    return response;
  }

  /**
   * Has a summary in addition to a description
   * Has a description in addition to a summary
   */
  async createGizmo(params?: {
    /**
     * Anonymous enum
     */
    size?: types.CreateGizmoSize;
  }): Promise<types.Gizmo> {
    const errors = validators.validateCreateGizmoParams(params);
    if (errors) throw errors;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.auth.oauth2Auth) {
      headers.authorization = `Bearer ${this.auth.oauth2Auth.accessToken}`;
    }

    const query: string[] = [];
    if (typeof params?.size !== 'undefined') {
      query.push(`size=${encodeURIComponent(params.size)}`);
    }

    let prefix = '';
    if (this.options?.root) {
      prefix = this.options.root;
      if (!prefix.startsWith('/')) prefix = `/${prefix}`;
    }

    const path = [`${prefix}/gizmos`, query.join('&')].join('?');

    const { json, status } = await this.fetch<types.Gizmo>(path, {
      method: 'POST',
      headers,
    });

    if (status !== 201) {
      throw new Error('Invalid response code');
    }

    const response = await json();

    const responseValidationErrors = validators.validateGizmo(response);
    if (responseValidationErrors) throw responseValidationErrors;

    return response;
  }

  async updateGizmo(params?: {
    /**
     * array of primitive
     */
    factors?: string[];
  }): Promise<types.Gizmo> {
    const errors = validators.validateUpdateGizmoParams(params);
    if (errors) throw errors;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.auth.oauth2Auth) {
      headers.authorization = `Bearer ${this.auth.oauth2Auth.accessToken}`;
    }

    const query: string[] = [];
    if (typeof params?.factors !== 'undefined') {
      query.push(
        `factors=${params.factors}.map(encodeURIComponent).join(',')}`,
      );
    }

    let prefix = '';
    if (this.options?.root) {
      prefix = this.options.root;
      if (!prefix.startsWith('/')) prefix = `/${prefix}`;
    }

    const path = [`${prefix}/gizmos`, query.join('&')].join('?');

    const { json, status } = await this.fetch<types.Gizmo>(path, {
      method: 'PUT',
      headers,
    });

    if (status !== 200) {
      throw new Error('Invalid response code');
    }

    const response = await json();

    const responseValidationErrors = validators.validateGizmo(response);
    if (responseValidationErrors) throw responseValidationErrors;

    return response;
  }
}

export class HttpWidgetService implements types.WidgetService {
  constructor(
    private readonly fetch: Fetch,
    private readonly auth: {
      apiKeyAuth?: { key: string };
    },
    private readonly options?: BasketryExampleOptions,
  ) {}

  async getWidgets(): Promise<types.Widget> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.auth.apiKeyAuth) {
      headers['x-apikey'] = this.auth.apiKeyAuth.key;
    }

    const query: string[] = [];

    let prefix = '';
    if (this.options?.root) {
      prefix = this.options.root;
      if (!prefix.startsWith('/')) prefix = `/${prefix}`;
    }

    const path = [`${prefix}/widgets`, query.join('&')].join('?');

    const { json, status } = await this.fetch<types.Widget>(path, {
      headers,
    });

    if (status !== 200) {
      throw new Error('Invalid response code');
    }

    const response = await json();

    const responseValidationErrors = validators.validateWidget(response);
    if (responseValidationErrors) throw responseValidationErrors;

    return response;
  }

  async createWidget(params?: {
    /**
     * The new widget
     */
    body?: types.CreateWidgetBody;
  }): Promise<void> {
    const errors = validators.validateCreateWidgetParams(params);
    if (errors) throw errors;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.auth.apiKeyAuth) {
      headers['x-apikey'] = this.auth.apiKeyAuth.key;
    }

    const query: string[] = [];

    let prefix = '';
    if (this.options?.root) {
      prefix = this.options.root;
      if (!prefix.startsWith('/')) prefix = `/${prefix}`;
    }

    const path = [`${prefix}/widgets`, query.join('&')].join('?');

    const body =
      params?.body === undefined ? undefined : JSON.stringify(params?.body);

    const { status } = await this.fetch(path, {
      method: 'POST',
      headers,
      body,
    });

    if (status !== 204) {
      throw new Error('Invalid response code');
    }
  }

  async putWidget(): Promise<void> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.auth.apiKeyAuth) {
      headers['x-apikey'] = this.auth.apiKeyAuth.key;
    }

    const query: string[] = [];

    let prefix = '';
    if (this.options?.root) {
      prefix = this.options.root;
      if (!prefix.startsWith('/')) prefix = `/${prefix}`;
    }

    const path = [`${prefix}/widgets`, query.join('&')].join('?');

    const { status } = await this.fetch(path, {
      method: 'PUT',
      headers,
    });

    if (status !== 200) {
      throw new Error('Invalid response code');
    }
  }

  async getWidgetFoo(params: {
    /**
     * The widget ID
     */
    id: string;
  }): Promise<types.Widget> {
    const errors = validators.validateGetWidgetFooParams(params);
    if (errors) throw errors;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.auth.apiKeyAuth) {
      headers['x-apikey'] = this.auth.apiKeyAuth.key;
    }

    const query: string[] = [];

    let prefix = '';
    if (this.options?.root) {
      prefix = this.options.root;
      if (!prefix.startsWith('/')) prefix = `/${prefix}`;
    }

    const path = [
      `${prefix}/widgets/${encodeURIComponent(params.id)}/foo`,
      query.join('&'),
    ].join('?');

    const { json, status } = await this.fetch<types.Widget>(path, {
      headers,
    });

    if (status !== 200) {
      throw new Error('Invalid response code');
    }

    const response = await json();

    const responseValidationErrors = validators.validateWidget(response);
    if (responseValidationErrors) throw responseValidationErrors;

    return response;
  }

  async deleteWidgetFoo(params: {
    /**
     * The widget ID
     */
    id: string;
  }): Promise<void> {
    const errors = validators.validateDeleteWidgetFooParams(params);
    if (errors) throw errors;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.auth.apiKeyAuth) {
      headers['x-apikey'] = this.auth.apiKeyAuth.key;
    }

    const query: string[] = [];

    let prefix = '';
    if (this.options?.root) {
      prefix = this.options.root;
      if (!prefix.startsWith('/')) prefix = `/${prefix}`;
    }

    const path = [
      `${prefix}/widgets/${encodeURIComponent(params.id)}/foo`,
      query.join('&'),
    ].join('?');

    const { status } = await this.fetch(path, {
      method: 'DELETE',
      headers,
    });

    if (status !== 204) {
      throw new Error('Invalid response code');
    }
  }
}

export class HttpExhaustiveService implements types.ExhaustiveService {
  constructor(
    private readonly fetch: Fetch,
    private readonly options?: BasketryExampleOptions,
  ) {}

  async exhaustiveFormats(params?: {
    stringNoFormat?: string;
    stringDate?: Date;
    stringDateTime?: Date;
    integerNoFormat?: number;
    integerInt32?: number;
    integerInt64?: number;
    numberNoFormat?: number;
    numberFloat?: number;
    numberDouble?: number;
  }): Promise<void> {
    const errors = validators.validateExhaustiveFormatsParams(params);
    if (errors) throw errors;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const query: string[] = [];
    if (typeof params?.stringNoFormat !== 'undefined') {
      query.push(
        `string-no-format=${encodeURIComponent(params.stringNoFormat)}`,
      );
    }
    if (typeof params?.stringDate !== 'undefined') {
      query.push(
        `string-date=${encodeURIComponent(formatDate(params.stringDate))}`,
      );
    }
    if (typeof params?.stringDateTime !== 'undefined') {
      query.push(
        `string-date-time=${encodeURIComponent(
          formatDateTime(params.stringDateTime),
        )}`,
      );
    }
    if (typeof params?.integerNoFormat !== 'undefined') {
      query.push(
        `integer-no-format=${encodeURIComponent(params.integerNoFormat)}`,
      );
    }
    if (typeof params?.integerInt32 !== 'undefined') {
      query.push(`integer-int32=${encodeURIComponent(params.integerInt32)}`);
    }
    if (typeof params?.integerInt64 !== 'undefined') {
      query.push(`integer-int64=${encodeURIComponent(params.integerInt64)}`);
    }
    if (typeof params?.numberNoFormat !== 'undefined') {
      query.push(
        `number-no-format=${encodeURIComponent(params.numberNoFormat)}`,
      );
    }
    if (typeof params?.numberFloat !== 'undefined') {
      query.push(`number-float=${encodeURIComponent(params.numberFloat)}`);
    }
    if (typeof params?.numberDouble !== 'undefined') {
      query.push(`number-double=${encodeURIComponent(params.numberDouble)}`);
    }

    let prefix = '';
    if (this.options?.root) {
      prefix = this.options.root;
      if (!prefix.startsWith('/')) prefix = `/${prefix}`;
    }

    const path = [`${prefix}/exhaustive`, query.join('&')].join('?');

    const { status } = await this.fetch(path, {
      headers,
    });

    if (status !== 204) {
      throw new Error('Invalid response code');
    }
  }

  async exhaustiveParams(params: {
    pathString: string;
    pathEnum: types.ExhaustiveParamsPathEnum;
    pathNumber: number;
    pathInteger: number;
    pathBoolean: boolean;
    pathStringArray: string[];
    pathEnumArray: types.ExhaustiveParamsPathEnumArray[];
    pathNumberArray: number[];
    pathIntegerArray: number[];
    pathBooleanArray: boolean[];
    queryString?: string;
    queryEnum?: types.ExhaustiveParamsQueryEnum;
    queryNumber?: number;
    queryInteger?: number;
    queryBoolean?: boolean;
    queryStringArray?: string[];
    queryEnumArray?: types.ExhaustiveParamsQueryEnumArray[];
    queryNumberArray?: number[];
    queryIntegerArray?: number[];
    queryBooleanArray?: boolean[];
    headerString?: string;
    headerEnum?: types.ExhaustiveParamsHeaderEnum;
    headerNumber?: number;
    headerInteger?: number;
    headerBoolean?: boolean;
    headerStringArray?: string[];
    headerEnumArray?: types.ExhaustiveParamsHeaderEnumArray[];
    headerNumberArray?: number[];
    headerIntegerArray?: number[];
    headerBooleanArray?: boolean[];
    body?: types.ExhaustiveParamsBody;
  }): Promise<void> {
    const errors = validators.validateExhaustiveParamsParams(params);
    if (errors) throw errors;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (typeof params.headerString !== 'undefined') {
      headers['header-string'] = encodeURIComponent(params.headerString);
    }
    if (typeof params.headerEnum !== 'undefined') {
      headers['header-enum'] = encodeURIComponent(params.headerEnum);
    }
    if (typeof params.headerNumber !== 'undefined') {
      headers['header-number'] = encodeURIComponent(params.headerNumber);
    }
    if (typeof params.headerInteger !== 'undefined') {
      headers['header-integer'] = encodeURIComponent(params.headerInteger);
    }
    if (typeof params.headerBoolean !== 'undefined') {
      headers['header-boolean'] = encodeURIComponent(params.headerBoolean);
    }
    if (typeof params.headerStringArray !== 'undefined') {
      headers['header-string-array'] = params.headerStringArray
        .map(encodeURIComponent)
        .join(',');
    }
    if (typeof params.headerEnumArray !== 'undefined') {
      headers['header-enum-array'] = params.headerEnumArray
        .map(encodeURIComponent)
        .join(',');
    }
    if (typeof params.headerNumberArray !== 'undefined') {
      headers['header-number-array'] = params.headerNumberArray
        .map(encodeURIComponent)
        .join('|');
    }
    if (typeof params.headerIntegerArray !== 'undefined') {
      headers['header-integer-array'] = params.headerIntegerArray
        .map(encodeURIComponent)
        .join(' ');
    }
    if (typeof params.headerBooleanArray !== 'undefined') {
      headers['header-boolean-array'] = params.headerBooleanArray
        .map(encodeURIComponent)
        .join('\t');
    }

    const query: string[] = [];
    if (typeof params.queryEnum !== 'undefined') {
      query.push(`query-enum=${encodeURIComponent(params.queryEnum)}`);
    }
    if (typeof params.queryNumber !== 'undefined') {
      query.push(`query-number=${encodeURIComponent(params.queryNumber)}`);
    }
    if (typeof params.queryInteger !== 'undefined') {
      query.push(`query-integer=${encodeURIComponent(params.queryInteger)}`);
    }
    if (typeof params.queryBoolean !== 'undefined') {
      query.push(`query-boolean=${encodeURIComponent(params.queryBoolean)}`);
    }
    if (typeof params.queryStringArray !== 'undefined') {
      query.push(
        `query-string-array=${params.queryStringArray}.map(encodeURIComponent).join(',')}`,
      );
    }
    if (typeof params.queryEnumArray !== 'undefined') {
      query.push(
        `query-enum-array=${params.queryEnumArray}.map(encodeURIComponent).join(',')}`,
      );
    }
    if (typeof params.queryNumberArray !== 'undefined') {
      query.push(
        `query-number-array=${params.queryNumberArray}.map(encodeURIComponent).join(',')}`,
      );
    }
    if (typeof params.queryIntegerArray !== 'undefined') {
      query.push(
        `query-integer-array=${params.queryIntegerArray}.map(encodeURIComponent).join(',')}`,
      );
    }
    if (typeof params.queryBooleanArray !== 'undefined') {
      query.push(
        `query-boolean-array=${params.queryBooleanArray}.map(encodeURIComponent).join(',')}`,
      );
    }

    let prefix = '';
    if (this.options?.root) {
      prefix = this.options.root;
      if (!prefix.startsWith('/')) prefix = `/${prefix}`;
    }

    const path = [
      `${prefix}/exhaustive/${encodeURIComponent(
        params.pathString,
      )}/${encodeURIComponent(params.pathEnum)}/${encodeURIComponent(
        params.pathNumber,
      )}/${encodeURIComponent(params.pathInteger)}/${encodeURIComponent(
        params.pathBoolean,
      )}/${params.pathStringArray
        .map(encodeURIComponent)
        .join(',')}/${params.pathEnumArray
        .map(encodeURIComponent)
        .join('|')}/${params.pathNumberArray
        .map(encodeURIComponent)
        .join(' ')}/${params.pathIntegerArray
        .map(encodeURIComponent)
        .join('\t')}/${params.pathBooleanArray
        .map(encodeURIComponent)
        .join(',')}`,
      query.join('&'),
    ].join('?');

    const body =
      params.body === undefined ? undefined : JSON.stringify(params.body);

    const { status } = await this.fetch(path, {
      headers,
      body,
    });

    if (status !== 204) {
      throw new Error('Invalid response code');
    }
  }
}

export class HttpAuthPermutationService
  implements types.AuthPermutationService
{
  constructor(
    private readonly fetch: Fetch,
    private readonly auth: {
      basicAuth?: { username: string; password: string };
      'alternate-basic-auth'?: { username: string; password: string };
      apiKeyAuth?: { key: string };
      oauth2Auth?: { accessToken: string };
      alternateApiKeyAuth?: { key: string };
    },
    private readonly options?: BasketryExampleOptions,
  ) {}

  async allAuthSchemes(): Promise<void> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.auth.basicAuth) {
      // TODO: remove deprecated method for node targets
      headers.authorization = `Basic ${btoa(
        `${this.auth.basicAuth.username}:${this.auth.basicAuth.password}`,
      )}`;
    }
    if (this.auth['alternate-basic-auth']) {
      // TODO: remove deprecated method for node targets
      headers.authorization = `Basic ${btoa(
        `${this.auth['alternate-basic-auth'].username}:${this.auth['alternate-basic-auth'].password}`,
      )}`;
    }
    if (this.auth.apiKeyAuth) {
      headers['x-apikey'] = this.auth.apiKeyAuth.key;
    }
    if (this.auth.oauth2Auth) {
      headers.authorization = `Bearer ${this.auth.oauth2Auth.accessToken}`;
    }

    const query: string[] = [];
    if (this.auth.alternateApiKeyAuth) {
      query.push(`apikey=${this.auth.alternateApiKeyAuth.key}`);
    }

    let prefix = '';
    if (this.options?.root) {
      prefix = this.options.root;
      if (!prefix.startsWith('/')) prefix = `/${prefix}`;
    }

    const path = [`${prefix}/authPermutations`, query.join('&')].join('?');

    const { status } = await this.fetch(path, {
      headers,
    });

    if (status !== 200) {
      throw new Error('Invalid response code');
    }
  }

  async comboAuthSchemes(): Promise<void> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.auth.basicAuth) {
      // TODO: remove deprecated method for node targets
      headers.authorization = `Basic ${btoa(
        `${this.auth.basicAuth.username}:${this.auth.basicAuth.password}`,
      )}`;
    }
    if (this.auth['alternate-basic-auth']) {
      // TODO: remove deprecated method for node targets
      headers.authorization = `Basic ${btoa(
        `${this.auth['alternate-basic-auth'].username}:${this.auth['alternate-basic-auth'].password}`,
      )}`;
    }
    if (this.auth.apiKeyAuth) {
      headers['x-apikey'] = this.auth.apiKeyAuth.key;
    }
    if (this.auth.oauth2Auth) {
      headers.authorization = `Bearer ${this.auth.oauth2Auth.accessToken}`;
    }

    const query: string[] = [];
    if (this.auth.alternateApiKeyAuth) {
      query.push(`apikey=${this.auth.alternateApiKeyAuth.key}`);
    }

    let prefix = '';
    if (this.options?.root) {
      prefix = this.options.root;
      if (!prefix.startsWith('/')) prefix = `/${prefix}`;
    }

    const path = [`${prefix}/authPermutations`, query.join('&')].join('?');

    const { status } = await this.fetch(path, {
      method: 'PUT',
      headers,
    });

    if (status !== 200) {
      throw new Error('Invalid response code');
    }
  }
}
