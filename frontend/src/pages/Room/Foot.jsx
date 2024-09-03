import CallEndIcon from '@mui/icons-material/CallEnd';

export default function Foot({ onCallEnd }) {
    return (
        <div>
        <span className='calltoaction endcall' onClick={onCallEnd}>
            <CallEndIcon />
        </span>
        </div>
    )
}