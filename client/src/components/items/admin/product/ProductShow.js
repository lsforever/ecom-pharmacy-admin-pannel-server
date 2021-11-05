import React from 'react'
import {
    EmailField,
    TextField,
    DateField,
    BooleanField,
    SimpleShowLayout,
    Show,
    ArrayField,
    Datagrid,
    TabbedShowLayout,
    Tab,
    useShowController,
    TopToolbar,
    EditButton,
    Button,
    ShowController,
    ShowView ,


} from 'react-admin'


const CustomShow = props => (
    <ShowController {...props}>
        {controllerProps => 
            <ShowView  {...props} {...controllerProps}>
                <SimpleShowLayout>
                    <TextField source="name" />
                    {controllerProps.record && controllerProps.record.price && 
                        <TextField source="price" />
                    }
                </SimpleShowLayout>
            </ShowView >
        }
    </ShowController>
);





const ProductShow = (props) => {

return(
    <CustomShow   {...props}>
          
{/* 
            <SimpleShowLayout>

            {console.log(props)}
                <TextField label="Product Type (Kind)" source="kind" />
                <TextField label="Name" source='name' />
                <BooleanField label="Is Published" source="flag" />


                <TextField label="Brand (optional)" source="brand" />
            </SimpleShowLayout> */}

            </CustomShow>
)

    return (


         <Show  {...props}>

            


            {/* <TabbedShowLayout syncWithLocation={false}>


                <Tab label="basics">
                    <SelectInput label="Product Type (Kind)" source="kind" optionText="name" optionValue="id" validate={required("Product Kind is required")} choices={kinds} />
                    <TextInput label="Name" source='name' />
                    <BooleanInput label="Is Published" source="flag" />


                    <NumberInput label="Price (optional)" source="price" />
                    <TextInput label="Brand (optional)" source="brand" />


                </Tab>

                <Tab label="Product Category">

                    <ReferenceInput
                        validate={required('Category is required')}
                        source="category"
                        defaultValue=""
                        label="Product Category"
                        reference="product-categories"
                        sort={{ field: 'name', order: 'ASC' }}
                    >
                        <SelectInput optionText="name" optionValue="id" defaultValue="" />
                    </ReferenceInput >


                </Tab>

                <Tab label="Product Description">
                    <RichTextInput label="Product description" source="description" />
                </Tab>


                <FormDataConsumer>
                    {({ formData, ...rest }) => {
                        if (formData.kind === "normal") {
                            return (
                                <Tab label="Normal Product" {...rest}>
                                    <TextInput label="Other" source="other" />
                                </Tab>
                            )
                        } else if (formData.kind === "eye_glass") {
                            return (
                                <Tab label="Eye Glass Product" {...rest}>
                                    <TextInput label="Eye Glass Type" source="eye_glass_type" />
                                </Tab>
                            )

                        } else if (formData.kind === "medicine") {
                            return (

                                <Tab label="Medicine Product" {...rest}>
                                    <TextInput label="Special Name" source="special_name" />
                                    <TextInput label="Strength" source="strength" />
                                    <NumberInput label="Strip" source="strip" />
                                    <NumberInput label="Box" source="box" />
                                </Tab>


                            )
                        } else {
                            return null
                        }

                    }}
                </FormDataConsumer>




                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.kind === "medicine" &&
                        <Tab label="Medicine Type" {...rest}>
                            <ArrayInput label="Medicine Type" source="medicine_type">
                                <SimpleFormIterator>
                                    <TextInput label="Type" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </Tab>
                    }
                </FormDataConsumer>

                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.kind === "medicine" &&
                        <Tab label="Company Name" {...rest}>
                            <ArrayInput label="Company Name" source="company_name">
                                <SimpleFormIterator>
                                    <TextInput label="Company" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </Tab>
                    }
                </FormDataConsumer>

                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.kind === "medicine" &&
                        <Tab label="Generic Name" {...rest}>
                            <ArrayInput label="Generic Name" source="generic_name" >
                                <SimpleFormIterator>
                                    <TextInput label="Generic" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </Tab>
                    }
                </FormDataConsumer>




            </TabbedShowLayout> */}






            {/* <SimpleShowLayout>
                <EmailField label="Email" source="email" />
                <TextField label="Id" source="id" />
                <BooleanField source="email_verified" />

                <ArrayField label="Roles" source="roles">
                    <Datagrid>
                        <TextField label="Type" source="type" />
                        <TextField label="Reference Id" source="ref_id" />
                        <BooleanField label="Role Activated" source="flag" />
                    </Datagrid>
                </ArrayField>


                <DateField label="Created Date" source="createdAt" />
                <DateField label="Updated Date" source="updatedAt" />
                <TextField label="Name" source="details.name" />
                <TextField label="Address" source="details.address" />
                <TextField label="Birthday" source="details.birthday" />

            </SimpleShowLayout> */}

            
            </Show>
    )
}


export default ProductShow