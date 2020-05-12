import fs from 'fs';
import { remote } from 'electron';

export const saveAsCsv = (name, data) =>
  remote.dialog.showSaveDialog(
    {
      defaultPath: name,
      filters: [
        {
          name: '.csv',
          extensions: ['csv'],
        },
      ],
    },
    (filePath) => {
      if (filePath) {
        fs.writeFileSync(filePath, data);
      }
    },
  );
