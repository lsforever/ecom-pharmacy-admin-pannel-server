import React from 'react'
import {
    EmailField,
    TextField,
    DateField,
    NumberField,
    BooleanField,
    SimpleShowLayout,
    Show,
    ArrayField,
    Datagrid,
    SingleFieldList,
    TabbedShowLayout,
    Tab,
    useShowController,
    TopToolbar,
    EditButton,
    Button,
    ShowController,
    ShowView,
    RichTextField,


} from 'react-admin'


const CustomShow = props => (
    <ShowController {...props}>
        {controllerProps =>
            <ShowView  {...props} {...controllerProps}>
                {/* <SimpleShowLayout>
                    <TextField source="name" />
                    {controllerProps.record && controllerProps.record.price && 
                        <TextField source="price" />
                    }
                </SimpleShowLayout> */}





                <TabbedShowLayout syncWithLocation={false}>


                    <Tab label="basics">
                        <TextField label="Product Type (Kind)" source="kind" />
                        <TextField label="Product Category" source="category.name" />

                        <TextField label="Name" source='name' />
                        <BooleanField label="Is Published" source="flag" />
                        <TextField label="Price (optional)" source="price" />
                        <TextField label="Brand (optional)" source="brand" />
                    </Tab>



                    <Tab label="Product Description">
                        <RichTextField label="Product description" source="description" />
                    </Tab>



                    {controllerProps.record && controllerProps.record.kind === "normal" &&
                        <Tab label="Normal Product" >
                            <TextField label="Other" source="other" />
                        </Tab>

                    }

                    {controllerProps.record && controllerProps.record.kind === "eye_glass" &&
                        <Tab label="Eye Glass Product" >
                            <TextField label="Eye Glass Type" source="eye_glass_type" />
                        </Tab>

                    }

                    {controllerProps.record && controllerProps.record.kind === "medicine" &&
                        <Tab label="Medicine Product" >
                            <TextField label="Special Name" source="special_name" />
                            <TextField label="Strength" source="strength" />
                            <NumberField label="Strip" source="strip" />
                            <NumberField label="Box" source="box" />
                        </Tab>

                    }


                    {/* {controllerProps.record.medicine_type = controllerProps.record.medicine_type.map(item => {value=item})
                    } */}


                    {controllerProps.record && controllerProps.record.kind === "medicine" &&
                        <Tab label="Medicine Type" >
                            <ArrayField label="Medicine Type" source="medicine_type">
                                <Datagrid>
                                    <TextField label="Type" source="value" />
                                </Datagrid>
                            </ArrayField>
                        </Tab>


                    }

                    {controllerProps.record && controllerProps.record.kind === "medicine" &&
                        <Tab label="Company Name" >
                            <ArrayField label="Company Name" source="company_name">
                                <SingleFieldList>
                                    <TextField />
                                </SingleFieldList>
                            </ArrayField>
                        </Tab>


                    }

                    {controllerProps.record && controllerProps.record.kind === "medicine" &&
                        <Tab label="Generic Name" >
                            <ArrayField label="Generic Name" source="generic_name" >
                                <SingleFieldList>
                                    <TextField label="Generic" />
                                </SingleFieldList>
                            </ArrayField>
                        </Tab>

                    }


                </TabbedShowLayout>
            </ShowView >
        }
    </ShowController>
);





const ProductShow = (props) => {

    return (
        <CustomShow   {...props}>

        </CustomShow>
    )


}


export default ProductShow