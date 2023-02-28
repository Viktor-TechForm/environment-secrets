import { writeFileSync } from 'fs';

let string = '';
for (let i = 1; i <= 100; i += 1) {
  string += `SECOND_SECRET_${i}: \${{ secrets.SECOND_SECRET_${i} }}\n`;
}

writeFileSync('./out.txt', string);
