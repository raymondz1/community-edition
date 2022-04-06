// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"

	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// AzureLocation azure location
//
// swagger:model AzureLocation
type AzureLocation struct {

	// display name
	DisplayName string `json:"displayName,omitempty"`

	// name
	Name string `json:"name,omitempty"`
}

// Validate validates this azure location
func (m *AzureLocation) Validate(formats strfmt.Registry) error {
	return nil
}

// ContextValidate validates this azure location based on context it is used
func (m *AzureLocation) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *AzureLocation) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *AzureLocation) UnmarshalBinary(b []byte) error {
	var res AzureLocation
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
