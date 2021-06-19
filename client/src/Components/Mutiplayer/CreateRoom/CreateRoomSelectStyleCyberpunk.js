const createRoomSelectStyleCyberpunk ={
    menu: (menu_styles)=> ({...menu_styles, 
        background: 'black', 
        border: 'solid 1px rgba(0, 214, 252, 0.6)',
        
    }),
    option: (menuList_styles, state)=> ({...menuList_styles,
        color: 'rgba(0, 214, 252, 0.9)',
        background: 'black',
        textShadow: state.isFocused ? '0px 0px 10px rgba(0, 214, 252, 1), 0px 0px 10px rgba(0, 214, 252, 1)' : 'none',
        "&:hover": {
            background: 'black',
            textShadow: '0px 0px 10px rgba(0, 214, 252, 1), 0px 0px 10px rgba(0, 214, 252, 1)'
        }
    }),
    singleValue: (singleValue_styles)=> ({...singleValue_styles,
        color: 'rgba(0, 214, 252, 0.9)'
    }),
    control: (control_styles, state)=> ({...control_styles,
        width: '203px', 
        background: 'none', 
        border: 'solid 1px rgba(0, 214, 252, 0.6)',
        border: state.isFocused ? 'solid 1px rgba(0, 214, 252, 0.6)' : 'solid 1px rgba(0, 214, 252, 0.6)',
        boxShadow: state.isFocused ? '0px 0px 10px rgba(0, 214, 252, 1)' : 'none',
        "&:hover": {
            border: 'solid 1px rgba(0, 214, 252, 0.6)',
            boxShadow: '0px 0px 10px rgba(0, 214, 252, 1)'
        },
    }),
    dropdownIndicator: (dropdown_styles)=> ({...dropdown_styles, 
        color: 'inherit',
        "&:hover": {
            color: 'inherit',
            textShadowColor: 'rgba(0, 214, 252, 1)',
            textShadowRadius: 10
        }
    }),
    indicatorSeparator: (indicator_styles)=> ({...indicator_styles, background: 'rgba(0, 214, 252, 0.6)'}),
    placeholder: (placeholder_styles)=> ({...placeholder_styles, color: 'rgba(0, 214, 252, 0.9)'}),
    input: (input_styles)=> ({...input_styles, color: 'rgba(0, 214, 252, 0.9)'}),
    noOptionsMessage: (noOptions_styles)=> ({...noOptions_styles, color: 'rgba(0, 214, 252, 0.9)'})
};

export default createRoomSelectStyleCyberpunk;