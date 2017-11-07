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
        javascript: 'JavaScript',
        html: 'HTML',
        less: 'less',
        svg: 'SVG',
        java: 'Java',
        csharp: 'C#',
        css: 'CSS',
        sass: 'sass',
        shell: 'Shell',
        python: 'Python',
        php: 'php'
    };

    return (input) => {
        return input && names[input] ? names[input] : (input.charAt(0).toUpperCase() + input.substr(1).toLowerCase());
    };
}