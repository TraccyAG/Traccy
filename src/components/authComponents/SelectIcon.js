import React from 'react';
import { Col, Row, SvgIcon } from "../common";
import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";
import './authComponents.scss'

const SelectInput = ({ defaultValue, options, value, onChange, name }) => {
    const { t } = useTranslation();
    return (
        <div >
            <Row>
                    <Form.Item
                        name={name}
                    >
                        <Select
                            className={'select-input'}
                            style={{ background: 'inherit' }}
                            dropdownStyle={{ backgroundColor: 'inherit', color: 'white' }}
                            defaultValue={defaultValue}
                            suffixIcon={<SvgIcon style={{fill:'white',marginTop:'25px'}} name="chevron-down" viewbox="0 -2 4 8" />}
                            popupClassName="select-drop"
                            options={options}
                            value={value}
                            onChange={onChange}
                        />
                    </Form.Item>
            </Row>
        </div>
    );
};

export default SelectInput;
