// src/declarations.d.ts  или  src/custom.d.ts
declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.sass' {
    const content: { [className: string]: string };
    export default content;
}
