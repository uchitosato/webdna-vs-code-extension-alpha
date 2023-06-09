const vscode = require('vscode');

function activate(context) {
    console.log('WebDNA language support extension is now active!');

    // Register the WebDNA language
    vscode.languages.register({ id: 'webdna', extensions: ['.dna'] });

    // Register the WebDNA color provider
    vscode.languages.registerColorProvider('webdna', {
        provideDocumentColors(document) {
            const colorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
            const colors = [];

            // Find all color codes in the document
            let match;
            while ((match = colorRegex.exec(document.getText()))) {
                const colorRange = new vscode.Range(
                    document.positionAt(match.index),
                    document.positionAt(match.index + match[0].length)
                );
                const color = new vscode.Color(
                    parseInt(match[0].substring(1, 3), 16),
                    parseInt(match[0].substring(3, 5), 16),
                    parseInt(match[0].substring(5, 7), 16)
                );
                colors.push({ range: colorRange, color });
            }

            return colors;
        }
    });
}

function deactivate() {
    console.log('WebDNA language support extension is now deactivated!');
}

module.exports = {
    activate,
    deactivate
};