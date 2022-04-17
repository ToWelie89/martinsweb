export function FormatCorrectNameForTech() {

    const names = {
        git: 'Git',
        npm: 'npm',
        grunt: 'Grunt',
        angular: 'Angular',
        babel: 'Babel',
        karma: 'Karma',
        jquery: 'jQuery',
        bootstrap: 'Bootstrap',
        js: 'JavaScript',
        json: 'JSON',
        javascript: 'JavaScript',
        html: 'HTML',
        less: 'less',
        svg: 'SVG',
        java: 'Java',
        csharp: 'C#',
        cs: 'C#',
        css: 'CSS',
        sass: 'sass',
        shell: 'Shell',
        python: 'Python',
        php: 'php',
        xml: 'XML',
        dotnet: '.NET',
        visualstudio: 'Visual Studio',
        wireshark: 'Wireshark',
        android: 'Android',
        svn: 'Subversion',
        requirejs: 'RequireJS',
        sonarqube: 'SonarQube',
        magnolia: 'Magnolia CMS',
        azuredevops: 'Azure Devops',
        typescript: 'TypeScript'
    };

    return (input) => {
        return input && names[input] ? names[input] : (input.charAt(0).toUpperCase() + input.substr(1).toLowerCase());
    };
}