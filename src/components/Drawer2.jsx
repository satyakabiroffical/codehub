import * as React from 'react';
import PropTypes from 'prop-types';
import { MdFilterListAlt } from 'react-icons/md';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { Box, Button, Checkbox, Drawer, FormControlLabel, FormGroup, Tab, Tabs, Typography } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 ,}} >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Drawer2() {
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    top: false,
    bottom: false,
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 1000 }}
      role="presentation"
    
    >
      <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 1000 , p : 3 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' ,  }} 
      >
        <Tab label="Gender" {...a11yProps(0)} 
        //  className={style.tab_color} 
         />
        <Tab label="Sort" {...a11yProps(1)} />
        <Tab label="Price" {...a11yProps(2)} />
        <Tab label="Ratting" {...a11yProps(3)} />
       
      </Tabs>
      <TabPanel value={value} index={0} >
      <FormGroup>
    
      
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="Men" />
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="Women" />
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="Children " />
    </FormGroup>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <FormGroup>
 
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="Recommended" />
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="Popularity" />
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="Low to High " />
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="High to Low" />
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="Label" />
      
    </FormGroup>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <FormGroup>
     
       
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="upto - 1000" />
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="upto - 2000" />
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="upto- 5000 " />
    </FormGroup>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <FormGroup>
    
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="1 star" />
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="2 star" />
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="3 star" />
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="4 star" />
      <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#fcd635'}} />} label="5 star " />
   
    </FormGroup>
      </TabPanel>
      
    </Box>
    </Box>
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
         <Button  onClick={toggleDrawer("left", true)} style={{ color: '#232323', border: '1px solid #232323', fontSize: '15px'}} >
            
           <MdFilterListAlt /> filter</Button>
      <Drawer
              state={state}
              anchor={"left"}
              open={state["left"]}
             
            >
              <Button onClick={toggleDrawer("left", false)} style={{ justifyContent: 'flex-start' ,color : '#232323' , fontSize: '18px'}}>
             
              <RiArrowUpDownLine  />
              <span  > Filter</span>
              </Button>
              {list("left")}
            </Drawer>
    </div>
  );
}