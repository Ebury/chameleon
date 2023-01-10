/* eslint-disable import/no-extraneous-dependencies */

/**
 * @fileoverview Props TS interface should be defined properly in .vue and types.ts file.
 * @author Anton Lazarev
 */

const utils = require('eslint-plugin-vue/lib/utils');
const path = require('path');
const { Project } = require('ts-morph');
const { isEqual } = require('lodash');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'Props TS interface should be exported in types.ts file.',
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    function areInterfacesSame(fileInterface, vueInterface) {
      const fileInterfaceStructure = fileInterface.getStructure();
      if (fileInterfaceStructure.properties.length !== vueInterface?.body?.body?.length) return false;

      const vueScriptSourceCode = context.getSourceCode().text;

      const vueInterfaceProps = vueInterface.body.body.map(property => ({
        name: property.key.name,
        hasQuestionToken: !!property.optional,
        type: vueScriptSourceCode.substring(
          property.typeAnnotation.range[0] + 1,
          property.typeAnnotation.range[1],
        ).trim(),
      }));

      return fileInterfaceStructure.properties.reduce((acc, fileInterfaceProperty) => {
        const isFileInterfaceInVueInterface = vueInterfaceProps.find(vueProp => isEqual(vueProp, {
          name: fileInterfaceProperty.name,
          hasQuestionToken: fileInterfaceProperty.hasQuestionToken,
          type: fileInterfaceProperty.type,
        }));
        if (!isFileInterfaceInVueInterface) {
          return {
            ...acc,
            [fileInterfaceProperty.name]: false,
          };
        }
        return acc;
      }, {});
    }

    function verifyInterfaceInTypesFile(vueInterfaceDeclaration) {
      const typesFile = path.resolve(path.parse(context.getPhysicalFilename()).dir, 'types.ts');

      const project = new Project();
      project.addSourceFilesAtPaths(typesFile);

      const sourceFile = project.getSourceFileOrThrow(typesFile);
      const fileInterfaceDeclaration = sourceFile.getInterfaces()
        .find(declaration => declaration?.getStructure()?.name === vueInterfaceDeclaration?.id?.name);

      return areInterfacesSame(fileInterfaceDeclaration, vueInterfaceDeclaration);
    }

    function verify(node) {
      const propsInterfaceName = node?.typeParameters?.params[0]?.typeName?.name;
      const isScriptLangTS = context.getSourceCode().text.indexOf('lang="ts"') !== -1;

      if (!propsInterfaceName && !isScriptLangTS) return;

      if (!propsInterfaceName && isScriptLangTS) {
        context.report({
          node,
          message: 'defineProps must be typed by props interface: defineProps<SomeInterfaceProps>',
        });
      }

      const interfaceExportDeclaration = context.getScope()
        .block
        ?.body
        ?.find(
          ({
            type,
            declaration,
          }) => type === 'ExportNamedDeclaration' && declaration?.id?.name === propsInterfaceName,
        );

      if (interfaceExportDeclaration) {
        context.report({
          node,
          message: `Interface ${propsInterfaceName} can't be exported. Export it in types.ts file instead.`,
        });
        return;
      }

      const interfaceDeclaration = context.getScope()
        .block
        ?.body
        ?.find(
          ({
            type,
            id,
          }) => type === 'TSInterfaceDeclaration' && id?.name === propsInterfaceName,
        );

      if (interfaceDeclaration) {
        let difference;
        try {
          difference = verifyInterfaceInTypesFile(interfaceDeclaration);
        } catch (e) {
          context.report({
            node,
            message: `Can't proceed file types.ts. This file must be placed in the same directory as ${context.getFilename()}: ${e.message}`,
          });
          return;
        }
        const differentProps = Object.keys(difference).join(', ');
        if (differentProps) {
          context.report({
            node,
            message: `These properties of interface ${propsInterfaceName} are different in ${context.getFilename()} and types.ts: ${differentProps}`,
          });
        }
      }
    }

    return utils.defineScriptSetupVisitor(context, {
      onDefinePropsEnter: verify,
    });
  },
};
