const iov2 = require('iov2');
const csgoempire = require('@api/csgoempire')

const empire_api_key = "";
//Your api key


init_ws();


async function init_ws() {

    csgoempire.auth(`Bearer ${empire_api_key}`);

    const metadata = await csgoempire.metadata().then(res => {
        return res.data;
    }).catch(err => {
        console.log('Error when getting metadata :', err);
        return;
    });
    if (!metadata?.user) {
        console.log(`Can't get metadata, abort !`);
        return;
    };

    const socket = iov2(`wss://trade.csgoempire.com/trade`, {
        transports: ["websocket"],
        path: "/s/",
        secure: true,
        rejectUnauthorized: false,
        reconnect: false,
        //if you want to auto-reconnect please write with your own logic + delete init_ws function call inside disconnect event.
        extraHeaders: {
            'User-agent': `API Bot`
        },
        query: {
            uid: metadata.user.id,
            token: metadata.socket_token
        }
    });
    socket.on('connect', () => {
        console.log('Connected to the websocket');
    });
    socket.on('init', async (data) => {
        if (!data?.authenticated) {
            socket.emit('identify', {
                uid: metadata.user.id,
                model: metadata.user,
                authorizationToken: metadata.socket_token,
                signature: metadata.socket_signature
            });
        };
        socket.emit('filters', {
            price_max: 99999999
        });
    });
    // Event listeners
    socket.on('new_item', (data) => {
        console.log('New item:', data);
    });

    socket.on('updated_item', (data) => {
        console.log('Updated item:', data);
    });

    socket.on('auction_update', (data) => {
        console.log('Auction update:', data);
    });

    socket.on('deleted_item', (data) => {
        console.log('Deleted item:', data);
    });

    socket.on('trade_status', (data) => {
        console.log('Trade status:', data);
    });

    socket.on('deposit_failed', (data) => {
        console.error('Deposit failed:', data);
    });
    socket.on('disconnect', (data) => {
        console.log("Empire socket disconnect : ", data);
        setTimeout(init_ws, 5000); // retry after 5 seconds
    });
};
