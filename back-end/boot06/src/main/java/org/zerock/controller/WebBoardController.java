package org.zerock.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.zerock.domain.WebBoard;
import org.zerock.persistence.WebBoardRepository;
import org.zerock.vo.PageMaker;
import org.zerock.vo.PageVO;

import lombok.extern.java.Log;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/boards/")
@Log
public class WebBoardController {
	
	@Autowired
	private WebBoardRepository repo;
	
	@GetMapping("/list")
	public PageMaker<WebBoard> list(PageVO vo, Model model) {
	
		Pageable page = vo.makePageable(0, "bno");
		
		Page<WebBoard> result = repo.findAll(repo.makePredicate(vo.getType(), vo.getKeyword()), page);
		
		log.info(""+page);
		log.info(""+result);
	
		return new PageMaker<WebBoard>(result);
	}
	
	@PostMapping("/register")
	public String registerPOST(WebBoard vo) {
		log.info("register post");
		log.info("" + vo);
		
		if(vo.getTitle().equals("") || vo.getWriter().equals(""))
		{
			return "fail";
		}
		else
		{
			repo.save(vo);	
			return "success";
		}
	}
	
}
