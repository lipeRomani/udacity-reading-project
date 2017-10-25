import React from 'react';


export default ({children, rules, runValidate}) => {
    if (!runValidate) {
        return children;
    }
    const validatedChilds = children.map(child => {
        const rule = rules[child.props.name] 
        const errors = applyValidation(rule, child);
        return React.cloneElement(child, {errors});
    });

    return validatedChilds;
}


const applyValidation = (rule, element) => {
    const validations = Object.keys(rule);
    let errors = { 
        hasError : false,
        field    : element.props.name,
        errors   : [] 
    }

    validations.forEach(validationName => {
        const elementValue = element.props.value;
        const ruleValue = rule[validationName].value;
        const ruleMessage = rule[validationName].message;
        
        const fnConstrain = Constraints[validationName];
        const result = fnConstrain(elementValue, ruleValue);
        
        if (!result) {
            const error = {
                type : validationName,
                message : ruleMessage
            }
            errors.errors.push(error)
        }
    });
    
    if (errors.errors.length > 0) {
        errors.hasError = true;
    }

    return errors;
}

class Constraints {
    static isRequired = (value, ruleValue) => {
        if (!ruleValue) return true;
        return value !== undefined && value !== null && value.length > 0
    };

    static minLength = (value, ruleValue) => {
        if (!value) return false;
        return value.length >= ruleValue;
    }

    static maxLength = (value, ruleValue) => {
        if (value === null || value === undefined) return false;
        return value.length <= ruleValue; 
    }
}
