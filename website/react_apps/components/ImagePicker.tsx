import React from 'react'
import convertFileToBase64 from '../functions/convertFileToBase64'
import api from '../functions/api'
import logError from '../functions/logError'
import { Form } from 'react-bootstrap'
import localization from '../functions/localization'

export const getBase64FromUrl = async (url) => {

    try {
        const data = (await api.fetchBase64DataFromUrl(url)).data
        console.log('getBase64FromUrl data length', data.length)
        return data;
    } catch (error) { logError(error) }

}

export default function ImagePicker(props: { setImage: (base64: string) => void, maxSize?: number }) {
    const setImage = props.setImage
    const maxSize = props.maxSize

    const [url, seturl] = React.useState(null)
    const [fromURL, setFromURL] = React.useState(false)

    return (
        <div>
            <Form.Check
                inline
                label={localization.fromTheLink}
                type={'checkbox'}
                onChange={(e) => {
                    setFromURL(e.target.checked)
                }}
            />
            {!fromURL ?

                <input
                    type='file'
                    accept=".jpg,.jpeg,.png,.webp,.gif"
                    onChange={(e) => {
                        const file = e.target.files[0]

                        convertFileToBase64(file).then((base64) => {
                            if (base64.length > maxSize)
                                alert(localization.imagePickerMaxSizeMessage + maxSize / 1024 + ' Kb')
                            else
                                setImage(base64)
                        })
                    }}
                /> :
                <div>
                    {localization.fromTheLink}
                    <input onChange={(e) => seturl(e.target.value)} />
                    <button onClick={() => {
                        getBase64FromUrl(url).then((base64) => {
                            if (base64.length > maxSize)
                                alert(localization.imagePickerMaxSizeMessage + maxSize / 1024 + ' Kb')
                            else
                                setImage(base64)
                        })
                    }}>fetch image</button>
                </div>
            }
        </div>
    )
}