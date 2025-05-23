import fs from 'fs';
import handlebars from 'handlebars';

interface ITemplateVariable{
    [key: string] : string | number;
}

interface IparseMailTemplate{
    file : string;
    variables:ITemplateVariable;
}

export default class HandlebarsMailTemplate {
    public async parse({file,variables}:IparseMailTemplate):Promise<string>{
        const templateFileContent = await fs.promises.readFile(file,{encoding:'utf-8'});
        const parseTemplate = handlebars.compile(templateFileContent);
        return parseTemplate(variables);
    }
}