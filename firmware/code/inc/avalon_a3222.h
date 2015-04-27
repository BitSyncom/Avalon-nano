/*
 * @brief A3222 head file
 *
 * @note
 *
 * @par
 */
#ifndef __AVALON_A3222_H_
#define __AVALON_A3222_H_

#define A3222_WORK_SIZE		(23*4)
#define A3222_REPORT_SIZE	12 /* work_id (8 bytes) + nonce (4bytes) */
#define A3222_REPORT_CNT	48

void a3222_spi_init(void);
int a3222_process_work(uint8_t *pkg);
int a3222_get_report_count(void);
int a3222_get_report(uint8_t *pkg);

#endif /* __AVALON_A3222_H_ */
