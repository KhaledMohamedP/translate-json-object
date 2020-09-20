declare module 'translate-json-object' {
    interface Options {
        googleApiKey?: string
        yandexApiKey?: string
    }

    function init(options: Options): boolean
    function translate(srcObj: object, language: string): Promise<object>

    interface Result {
        init: typeof init
        translate: typeof translate
    }

    function TranslateJSONObject(): Result

    export default TranslateJSONObject
}
