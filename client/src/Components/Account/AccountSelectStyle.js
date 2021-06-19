const accountSelectStyle ={
    menu: (menu_styles)=> ({...menu_styles, 
        background: '#66bb6ae1', 
        border: 'solid 1px #102542',
        
    }),
    option: (menuList_styles, state)=> ({...menuList_styles,
        color: '#102542',
        background: '#66bb6ae1',
        borderBottom: 'solid 1px #102542'
    }),
    singleValue: (singleValue_styles)=> ({...singleValue_styles,
        color: '#102542'
    }),
    control: (control_styles, state)=> ({...control_styles,
        width: '203px', 
        background: 'none', 
        border: '#102542',
        border: state.isFocused ? 'solid 1px #102542' : 'solid 1px #102542',
        boxShadow: 'none',
        "&:hover": {
            border: 'solid 1px #102542'
        },
    }),
    dropdownIndicator: (dropdown_styles)=> ({...dropdown_styles, 
        color: 'inherit',
        "&:hover": {
            color: 'inherit',
        }
    }),
    indicatorSeparator: (indicator_styles)=> ({...indicator_styles, background: '#102542'}),
    placeholder: (placeholder_styles)=> ({...placeholder_styles, color: '#102542'}),
    input: (input_styles)=> ({...input_styles, color: '#102542'}),
    noOptionsMessage: (noOptions_styles)=> ({...noOptions_styles, color: '#102542'})
};

export default accountSelectStyle;