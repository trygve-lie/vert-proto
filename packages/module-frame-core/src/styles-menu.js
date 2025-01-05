import { css } from 'lit';

export default css`
    .menu {
        display: none;
    }

    @media only screen and (max-width: 1024px) and (min-width: 768px) {
        .menu {
            display: flex;
            flex-direction: column;  
            gap: 20px;
        }

        .menu app-view {
            align-self: center;
        }
    }

    @media only screen and (max-width: 768px) {
        .menu {
            display: flex;
            align-items: center;
            justify-content: space-evenly;   
            gap: 5px;
            height: 100%;
        }
    }



    /* Navigation */
    #navigation ul li {
        border-top: solid 1px rgb(46, 46, 46);
    }

    #navigation ul li:first-child {
        border-top: none;
    }

    #navigation ul li a {
        display: block;
        padding-top: 10px;
        padding-bottom: 10px;
    }        
`;