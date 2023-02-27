const fs = require('fs');

let string = '';
for (let i = 1; i <= 100; i += 1) {
  string += `SECRET_${i}: \${{ secrets.secret_${i} }}\n`;
}

fs.writeFileSync('./out.txt', string);
