import  React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectBrand, setSelectCat } from '../../redux/productSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

function getStyles(name, [], theme) {
  return {
    fontWeight:
      [].indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ProductFilter({ data }) {
  const theme = useTheme();
 const dispatch = useDispatch();
  const selectCat = useSelector((state) => state.productslice.selectCat);
  const selectBrand = useSelector((state) => state.productslice.selectBrand);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if(data.title==='category'){
        dispatch(setSelectCat(typeof value === 'string' ? value.split(',') : value))
    }else if (data.title==='brand'){
        dispatch(setSelectBrand(typeof value === 'string' ? value.split(',') : value))
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '100%', mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={data.title==='category' ? selectCat : data.title==='brand' ? selectBrand : []}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select Products</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Select Products</em>
          </MenuItem>
          {data.selectData.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, [], theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
