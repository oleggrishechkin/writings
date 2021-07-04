function template({ template }, opts, { componentName, jsx }) {
    const typeScriptTpl = template.smart({ plugins: ['jsx', 'typescript'] });

    const name = `${componentName.name.replace('Svg', '').replace('Black', '').replace('24Dp', '')}Icon`;

    return typeScriptTpl.ast`
        import React, { SVGProps, ReactElement } from 'react';

        const ${name} = (props: SVGProps<SVGSVGElement>): ReactElement => ${jsx}
        
        export default ${name};
  `;
}

module.exports = template;
