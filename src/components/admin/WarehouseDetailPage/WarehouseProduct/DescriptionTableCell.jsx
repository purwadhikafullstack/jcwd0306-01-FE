import { TableCell, Typography } from '@mui/material';
import { string } from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

function DescriptionTableCell({ text }) {
  const [resultText, setResultText] = useState();
  const MAX_LENGTH = useMemo(() => 150, []);
  const plainText = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.body.textContent;
  }, [text]);

  useEffect(() => {
    setResultText(plainText.slice(0, MAX_LENGTH));
  }, [plainText]);

  const toggleIsTruncated = () => {
    setResultText((prevState) =>
      prevState === plainText ? plainText.slice(0, MAX_LENGTH) : plainText
    );
  };

  return (
    <TableCell sx={{ wordBreak: 'break-word' }}>
      <Typography
        component="span"
        variant="caption"
        sx={{ width: '20rem', display: 'inline-block' }}
      >
        {resultText}
        {plainText.length > MAX_LENGTH && (
          <Typography
            component="span"
            variant="caption"
            onClick={toggleIsTruncated}
            sx={{ fontWeight: 600, cursor: 'pointer' }}
          >
            {plainText !== resultText
              ? '...lihat selengkapnya'
              : ' Tampilkan sedikit'}
          </Typography>
        )}
      </Typography>
    </TableCell>
  );
}

DescriptionTableCell.propTypes = {
  text: string.isRequired,
};

export default DescriptionTableCell;
