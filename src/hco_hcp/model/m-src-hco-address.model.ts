import { Expose, Transform } from 'class-transformer'
import moment from 'moment';

export class MSrcHcoAddressModel {
    @Expose({ name: 'address_line_1__v' })
    adrsLine1: string;

    @Expose({ name: 'sub_administrative_area__v' })
    subAdministrativeArea: string;

    @Expose({ name: 'locality__v' })
    locality: string;

    @Expose({ name: 'address_line_2__v' })
    adrsLine2: string;

    @Expose({ name: 'address_status__v' })
    addressStatus: string;

    @Expose({ name: 'formatted_address__v' })
    formattedAddress: string;

    @Expose({ name: 'postal_code__v' })
    pstl: string;

    @Expose({ name: 'administrative_area__v' })
    prvncCd: string;

    @Expose({ name: 'premise__v' })
    premise: string;

    @Expose({ name: 'delivery_address__v' })
    deliveryAddress: string;

    @Expose({ name: 'delivery_address_1__v' })
    deliveryAddress_1: string;

    @Expose({ name: 'thoroughfare__v' })
    thoroughfare: string;
    
    @Expose({ name: 'address_ordinal__v' })
    addressOrdinal: string;
    
    @Expose({ name: 'latitude__v' })
    latitude: string;
    
    @Expose({ name: 'longitude__v' })
    longitude: string;

    @Expose({ name: 'created_date__v' })
    @Transform((value) => (value ? moment(value).toDate() : null))
    adrsCrtDt: Date;

    @Expose({ name: 'modified_date__v' })
    @Transform((value) => (value ? moment(value).toDate() : null))
    adrsUpdtDt: Date;

}
