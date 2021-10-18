import moment from 'moment';

function change_date(published_at){
    
    const published_date = moment(published_at).format('YYYY-MM-DD');
    
    return published_date;
}

export default change_date;