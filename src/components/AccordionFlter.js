import * as React from "react";
import { TiPlus } from "react-icons/ti";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import style from "../assets/css/FilterPage.module.css";
import RangeSlider from "./Slider/RangeSlider";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";

export default function SimpleAccordion({
  name,
  filterMap,
  filterMap1,
  rate,
  Type,

  setRange,
  range,
}) {
  const id = ProductContext(ProductArray);
  const setTechnologyId = id.setTechnologyId;
  const setCategoriesId = id.setCategoriesId;
  const categoriesId = id.categoriesId;
  const technologyId = id.technologyId;
  const setTypeName = id.setTypeName;
  const typeName = id.typeName;
  const allTypes = id.allTypes;
  const matches = useMediaQuery("(max-width:870px)");

  return (
    <Accordion style={{ width: `${matches ? "22rem" : "auto"}` }}>
      <AccordionSummary
        expandIcon={<TiPlus style={{ color: "var(--color-themeS)" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={style.Accordion_lable_text_1}>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {rate && <RangeSlider setRange={setRange} range={range} />}

        {Type && (
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={typeName}
            // onClick={()=>setTechnologyId(technologyId)}
          >
            {allTypes && allTypes.length ? (
              allTypes.map((value, index) => (
                <FormControlLabel
                  key={index}
                  value={value._id}
                  control={
                    <Radio
                      style={{ color: "var(--color-themeS)" }}
                      onClick={(e) => setTypeName(e.target.value)}
                      checked={typeName === value._id}
                    />
                  }
                  label={value.name}
                />
              ))
            ) : (
              <CircularProgress color="info" value={40} />
            )}
          </RadioGroup>
        )}

        {filterMap && (
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={technologyId}
            // onClick={()=>setTechnologyId(technologyId)}
          >
            {filterMap && filterMap.length ? (
              filterMap.map((value, index) => (
                <FormControlLabel
                  key={index}
                  value={value._id}
                  control={
                    <Radio
                      style={{ color: "var(--color-themeS)" }}
                      onClick={(e) => setTechnologyId(e.target.value)}
                      checked={technologyId === value?._id}
                    />
                  }
                  label={value.name}
                />
              ))
            ) : (
              <CircularProgress color="info" value={40} />
            )}
          </RadioGroup>
        )}
        {filterMap1 && (
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={categoriesId}
            // onClick={()=>setTechnologyId(technologyId)}
          >
            {filterMap1 && filterMap1.length ? (
              filterMap1.map((value, index) => (
                <FormControlLabel
                  key={index}
                  value={value._id}
                  control={
                    <Radio
                      style={{ color: "var(--color-themeS)" }}
                      onClick={(e) => setCategoriesId(e.target.value)}
                      checked={categoriesId === value?._id}
                    />
                  }
                  label={value.name}
                />
              ))
            ) : (
              <CircularProgress color="info" value={40} />
            )}
          </RadioGroup>
        )}

        {/* {rate ? (
          <RangeSlider setRange={setRange} range={range} />
        ) : (
          <FormGroup
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0.6rem",
            }}
          >
            {Type && (
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={typeName}
                // onClick={()=>setTechnologyId(technologyId)}
              >
                {allTypes && allTypes.length ? (
                  allTypes.map((value, index) => (
                    <FormControlLabel
                      key={index}
                      value={value._id}
                      control={
                        <Radio
                          style={{ color: "var(--color-themeS)" }}
                          onClick={(e) => setTypeName(e.target.value)}
                        />
                      }
                      label={value.name}
                    />
                  ))
                ) : (
                  <CircularProgress color="info" value={40} />
                )}
              </RadioGroup>
            ) : (
              // <RadioGroup
              //   aria-labelledby="demo-controlled-radio-buttons-group"
              //   name="controlled-radio-buttons-group"
              //   value={typeName}
              //   // onClick={()=>setTypeName(typeName)}
              // >
              //   <FormControlLabel
              //     value={"Websites"}
              //     control={
              //       <Radio
              //         onChange={(e) => setTypeName(e.target.value)}
              //         style={{ color: "var(--color-themeS)" }}
              //       />
              //     }
              //     label="Websites"
              //   />

              //   <FormControlLabel
              //     value={"Apps"}
              //     control={
              //       <Radio
              //         onChange={(e) => setTypeName(e.target.value)}
              //         style={{ color: "var(--color-themeS)" }}
              //       />
              //     }
              //     label="Apps"
              //   />
              // </RadioGroup>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={technologyId}
                // onClick={()=>setTechnologyId(technologyId)}
              >
                {filterMap && filterMap.length ? (
                  filterMap.map((value, index) => (
                    <FormControlLabel
                      key={index}
                      value={value._id}
                      control={
                        <Radio
                          style={{ color: "var(--color-themeS)" }}
                          onClick={(e) => setTechnologyId(e.target.value)}
                        />
                      }
                      label={value.name}
                    />
                  ))
                ) : (
                  <CircularProgress color="info" value={40} />
                )}
              </RadioGroup>
            )}
          </FormGroup>
        )} */}
      </AccordionDetails>
    </Accordion>
  );
}
