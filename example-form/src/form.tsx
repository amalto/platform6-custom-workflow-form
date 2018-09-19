//all portal modules imports made there needs to be declared as externals in the production webpack config file
import * as React from 'react'
import { FormProps } from 'redux-form'

import * as platform6 from '@amalto/platform6-ui'

const webStorage = platform6.webStorage
const forms = platform6.forms

import TextInput from '@amalto/text-input'
import TogglePanel from '@amalto/toggle-panel'

import * as inputValidation from '@amalto/input-validation'

import { getWordings } from '@amalto/helpers'

const CUSTOM_WORDINGS = {

    amount: {
        'en-US': 'Amount to pay',
        'fr-FR': 'Montant à payer'
    },
    currency: {
        'en-US': 'Currency',
        'fr-FR': 'Devise'
    }

}

const WORDINGS = getWordings( CUSTOM_WORDINGS, webStorage.locale )


module CustomForm {

    //This interface represents the data model sent by your script server side
    //It is copied to the "data" props and the "initialValues" props to auto-populate redux-form fields
    export interface InitialData {
        pdfUrl: string,
        currency: string
    }

    export interface Props extends React.Props<CustomForm>, platform6.CustomFormDialog.CustomComponentProps, FormProps<any, any, any> {
        data: InitialData
        initialValues: InitialData
    }

    export interface PayloadData extends InitialData {
        amount: string;
    }

    export interface State {

    }
}

class CustomForm extends React.Component<CustomForm.Props, CustomForm.State> {
    constructor( props: CustomForm.Props ) {
        super( props )

        this.state = {

        }
    }

    render() {

        const { handleSubmit, title, closeForm, data } = this.props

        return (

            <TogglePanel panelTitle={title}
                defaultOpened={true} togglable={false}
                cancelBtn={{ label: WORDINGS.cancel, action: closeForm }}
                submitBtn={{ label: WORDINGS.submit, action: handleSubmit( this.submitForm ) }}>

                <div className="col-xs-12">

                    <div className="tile text-center text-xlarge mgb-10">
                        PDF URL: <a href={data.pdfUrl} target="_blank">LINK</a>
                    </div>

                    <div>
                        <TextInput
                            name="amount"
                            label={WORDINGS.amount}
                            validate={value => inputValidation.required( value, webStorage.locale )}
                        />
                    </div>

                    <div>
                        <TextInput
                            name="currency"
                            label={WORDINGS.currency}
                            validate={value => inputValidation.required( value, webStorage.locale )}
                        />
                    </div>


                </div>

            </TogglePanel>

        )
    }

    private submitForm = ( values: CustomForm.PayloadData ) => {

        const payload = {
            amount: values.amount,
            currency: values.currency
        }

        this.props.submitForm( payload )
    }

}

export default forms.reduxForm( { form: 'custom_form' } )( CustomForm ) as any