import React, { useState } from 'react';
import './JSONExplorer.css';

export default function JSONExplorer(json) {

    // for value displayed under input form - the value from the json
    const [value, setValue] = useState('');
    // for value displayed in input form - path of value in the json
    const [inputValue, setInputValue] = useState('');

    // when click on a key in json
    const onClickJson = (e) => {
        let innerText = e.target.innerText;
        let id = e.target.id;
        // console.log(innerText);
        // console.log(id)

        // when an object does not contain any other objects inside - for example, for date
        if (id === innerText) {
            // provide value for input form
            setInputValue('json.' + id);
            // provide result value
            setValue(json.json[id].toString());
            // if object has object as a child
        } else {
            // provide value for input form
            setInputValue('json.' + id + '[0].' + innerText);
            // provide result value
            setValue(json.json[id][0][innerText].toString());
        }
    }

    // when typing a path in input form
    const onChangeInput = (e) => {
        let name = e.target.value;
        setInputValue(name);
        // dot has to be in the input value
        if (name.includes('.')) {
            let nameArray = name.split('.');
            // length 2 means the user can get only entries where values are primitive (strings, numbers, boolean, etc. - not objects)
            if (nameArray.length === 2) {
                setValue(json[nameArray[0]]?.[nameArray[1]]?.toString() && typeof json[nameArray[0]]?.[nameArray[1]] !== 'object' ? json[nameArray[0]]?.[nameArray[1]]?.toString() : 'undefined');
                return;
                // if object contains object inside
            } else if (nameArray.length > 2) {
                // first value - "json", 2nd - "fields", 3rd - number 0, 4th - field in fields (id, prop, etc.)
                console.log(
                    json[nameArray[0]]?.
                    [nameArray[1]?.split('[')?.[0]]?.
                    [parseInt(nameArray[1]?.split('[')?.[1]?.split(']')?.[0])]?.
                    [nameArray[2]]?.toString()
                );
                setValue(
                    json[nameArray[0]]?.
                    [nameArray[1]?.split('[')?.[0]]?.
                    [parseInt(nameArray[1]?.split('[')?.[1]?.split(']')?.[0])]?.
                    [nameArray[2]]?.toString()
                        ?
                        json[nameArray[0]]?.
                        [nameArray[1]?.split('[')?.[0]]?.
                        [parseInt(nameArray[1]?.split('[')?.[1]?.split(']')?.[0])]?.
                        [nameArray[2]]?.toString()
                        :
                        'undefined'
                );
            }
            // if input is not valid
        } else {
            setValue('undefined');
            setInputValue(name);
        }
    }

    return (
        <div>
            <input type='text' onChange={onChangeInput} value={inputValue}></input>
            <p>Value: {value}</p>

            <h6>JSON</h6>
            <code>
                <pre>
                    {/* curly braces */}
                    &#123;
                    <br />
                    {Object.entries(json.json).map(([key, value]) => {
                        if (typeof value !== 'object') {
                            return (
                                <div>
                                    &emsp;&emsp;<span id={key} key={key} value={key} onClick={onClickJson}>{key}</span>: {value.toString()},
                                </div>
                            )
                        } else {
                            let objectProps = Object.entries(value[0]).map(([arrayKey, arrayValue]) => {
                                return (
                                    <div>
                                        &emsp;&emsp;&emsp;&emsp;&emsp;<span id={key} value={arrayKey} key={arrayKey} onClick={onClickJson}>{arrayKey}</span>: {arrayValue.toString()},
                                    </div>
                                )
                            })
                            return (
                                <div>
                                    {/* key with square braces open */}
                                    &emsp;&emsp;{key}: &#91;
                                    <br />
                                    {/* curly braces open */}
                                    &emsp;&emsp;&emsp;&#123;
                                    <br />
                                    {objectProps}
                                    {/* curly braces close */}
                                    &emsp;&emsp;&emsp;&#125;
                                    <br />
                                    {/* square braces close */}
                                    &emsp;&emsp;&#93;
                                </div>
                            )
                        }
                    })
                    }
                    &#125;
                </pre>
            </code>
        </div>
    )
}