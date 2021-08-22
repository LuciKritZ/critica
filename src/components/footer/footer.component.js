/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './footer.component.scss';

const FooterComponent = () => (
    <>
        <footer>
            <section className="ft-main">
                <div className="ft-main-item">
                    <h2 className="ft-title">Company</h2>
                    <ul>
                        <li>
                            <a href="javascript:void(0)">About Us</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">Careers</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">Ad Preferences</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">Interest Based Ads</a>
                        </li>
                    </ul>
                </div>
                <div className="ft-main-item">
                    <h2 className="ft-title">About Us</h2>
                    <ul>
                        <li>
                            <a href="javascript:void(0)">Authors</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">Advertise</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">Api</a>
                        </li>
                    </ul>
                </div>
                <div className="ft-main-item">
                    <h2 className="ft-title">Contact</h2>
                    <ul>
                        <li>
                            <a href="javascript:void(0)">Help</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">Bugs</a>
                        </li>
                    </ul>
                </div>
            </section>

            {/* <section className="ft-social">
                <ul className="ft-social-list">
                    <li><a href="javascript:void(0)"><TwitterOutlined /></a></li>
                    <li><a href="javascript:void(0)"><GithubOutlined /></a></li>
                    <li><a href="javascript:void(0)"><FacebookOutlined /></a></li>
                    <li><a href="javascript:void(0)"><YoutubeOutlined /></a></li>
                </ul>
            </section> */}

            <section className="ft-legal">
                <ul className="ft-legal-list">
                    <li>
                        <a href="javascript:void(0)">Terms &amp; Conditions</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">Privacy Policy</a>
                    </li>
                    <li>&copy; 2021 Copyright Critica.</li>
                </ul>
            </section>
        </footer>
    </>
);

export default FooterComponent;
