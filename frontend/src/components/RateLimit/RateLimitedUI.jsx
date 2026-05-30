import { Zap } from "lucide-react";
import styles from "./RateLimited.module.css";

const RateLimitedUI = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.alertBox}>
        <div className={styles.flexLayout}>
          <div className={styles.iconContainer}>
            <Zap size={40} className={styles.warningIcon} />
          </div>
          <div className={styles.textContent}>
            <h3 className={styles.title}>Rate Limit Reached</h3>
            <p className={styles.description}>
              You've made too many requests in a short period. Please wait a
              moment.
            </p>
            <p className={styles.subtext}>
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
