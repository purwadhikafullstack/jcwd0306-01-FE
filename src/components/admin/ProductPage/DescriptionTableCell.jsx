import { TableCell, Typography } from '@mui/material';
import { string } from 'prop-types';
import { useEffect, useState } from 'react';

const MAX_TEXT_CHAR = 150;

function DescriptionTableCell({ text }) {
  const [resultText, setResultText] = useState();

  useEffect(() => {
    setResultText(text.slice(0, MAX_TEXT_CHAR));
  }, [text]);

  const toggleIsTruncated = () => {
    setResultText((prevState) =>
      prevState === text ? text.slice(0, MAX_TEXT_CHAR) : text
    );
  };

  return (
    <TableCell>
      <Typography
        component="span"
        variant="caption"
        sx={{ width: '20rem', display: 'inline-block' }}
      >
        {resultText}
        {text.length > MAX_TEXT_CHAR && (
          <Typography
            component="span"
            variant="caption"
            onClick={toggleIsTruncated}
            sx={{ fontWeight: 600, cursor: 'pointer' }}
          >
            {text !== resultText
              ? '...lihat selengkapnya'
              : 'Tampilkan sedikit'}
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
